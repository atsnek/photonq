import {
  Connection_1_2_3_4_5_6,
  ObjectAndUser,
  Privacy,
  User,
  User_1
} from '@snek-functions/origin/dist/schema.generated';
import { TActivity, TActivityType } from '../activity/types/activity';
import { t } from 'snek-query';
import { sq } from '@snek-functions/origin';
import { TPaginationData } from '../../../shared/types/pagination';
import { snekResourceId } from '@atsnek/jaen';

/**
 * Returns the display name of a user
 * @param user The user to get the display name of
 * @returns The display name of the user
 * @example getDisplayname({ username: "test", details: { firstName: "Test", lastName: "User" } }) // "Test User"
 * @example getDisplayname({ username: "test", details: { firstName: "Test" } }) // "Test"
 * @example getDisplayname({ username: "test", details: { lastName: "User" } }) // "User"
 * @example getDisplayname({ username: "test" }) // "test"
 */
export const getUserDisplayname = (user: ObjectAndUser | User_1) => {
  let displayName: string | undefined = undefined;
  if (user.details?.firstName) {
    displayName = user.details.firstName;
  }
  if (user.details?.lastName) {
    if (displayName) displayName += ` ${user.details.lastName}`;
    else displayName = user.details.lastName;
  }

  if (!displayName) {
    displayName = user.username ?? '';
  }
  return displayName;
};

/**
 * Builds the activity section for a user (profile)
 * @param q  The query object
 * @param activities  The activities to build the section from
 * @returns One or more activity sections
 */
export const buildUserActivities = async (
  activityConnection: Connection_1_2_3_4_5_6,
  currentUser: t.Nullable<User>
): Promise<TPaginationData<TActivity[]>> => {
  // Only show the most recent rating for a post
  const activityRatingPostIds: Array<{ createdAt: string; id: string }> = [];
  activityConnection.edges
    .filter(ae => ae.node.type?.startsWith('star'))
    .sort((a, b) => {
      if (!a.node.createdAt || !b.node.createdAt) return 0;
      return (
        new Date(a.node.createdAt).getTime() -
        new Date(b.node.createdAt).getTime()
      );
    })
    .forEach(ae => {
      const { createdAt, post, type } = ae.node;
      if (!post) return;
      const pos = activityRatingPostIds.findIndex(({ id }) => id === post.id);
      const isUnstar = type === 'star_unstar';
      if (pos !== -1) {
        if (
          new Date(activityRatingPostIds[pos].createdAt) > new Date(createdAt)
        )
          return;
        if (type === 'star_unstar') {
          activityRatingPostIds.splice(pos, 1);
          return;
        }
        activityRatingPostIds[pos].createdAt = createdAt;
      } else if (!isUnstar)
        activityRatingPostIds.push({ createdAt, id: post.id });
    });

  const activityList: TPaginationData<TActivity[]> = {
    items: [],
    totalCount: activityConnection.totalCount,
    hasMore: activityConnection.pageInfo.hasNextPage,
    nextCursor: activityConnection.pageInfo.endCursor ?? undefined,
    prevCursor: activityConnection.pageInfo.startCursor ?? undefined,
    state: 'success'
  };

  const items = activityConnection.edges
    .filter(fe => fe.node.type !== 'blog_create' || fe.node.post !== null)
    .map(async ae => {
      const { createdAt, post, type, follow } = ae.node;
      if (
        !createdAt ||
        (type.startsWith('star_') &&
          (!post ||
            (post &&
              activityRatingPostIds.findIndex(
                ({ createdAt: existingCreatedAt, id }) =>
                  id === post.id && existingCreatedAt === createdAt
              ) === -1)))
      )
        return;
      let title = '';
      let href = '';
      if (type === 'blog_create' && post) {
        if (
          post.privacy === Privacy.PRIVATE &&
          post.profileId !== currentUser?.id
        ) {
          title = 'Created a private experiment';
          href = '#';
        } else {
          title = `Created a new experiment \"${post.title?.substring(0, 20)}${post.title?.length > 20 ? '...' : ''
            }\"`;
          href = '/experiments/' + post.slug;
        }
      } else if (type === 'profile_create') {
        title = `Joined the community`;
        href = '#';
      } else if (type === 'follow_follow') {
        if (!follow || !follow.followed) return;
        const [followedUser, followedUserError] = await sq.query(q => {
          const user = q.user({
            resourceId: __SNEK_RESOURCE_ID__,
            id: follow.followed.id
          });
          user.username;
          user.details?.firstName;
          user.details?.lastName;
          return user;
        });
        if (
          !followedUser ||
          (followedUserError && followedUserError.length > 0)
        )
          return;
        title = `Followed ${getUserDisplayname(followedUser)}`;
        href = follow.followed?.id ? '/user/' + followedUser.username : '#';
      } else if (type === 'star_star' && post) {
        title = `Starred an experiment \"${post.title?.substring(0, 20)}${post.title?.length > 20 ? '...' : ''
          }\"`;
        href = '/experiments/' + post.slug;
      }

      if (Object.isSealed(activityList.items)) {
        activityList.items = [...activityList.items];
      }

      return {
        type: type as TActivityType,
        timestamp: createdAt,
        title: {
          name: title,
          href
        }
      };
    });
  activityList.items = (await Promise.all(items)).filter(
    Boolean
  ) as TActivity[];
  return activityList;
};

/**
 * Follow or unfollow a user
 * @param userId The user id to follow or unfollow
 * @param isFollowing Whether the user is currently following the user or not. (f.e. if the user is following the user right now, this should be true)
 * @returns Whether the request was successful or not
 */
export const changeUserFollowingState = async (
  userId: string,
  isFollowing: boolean
): Promise<boolean> => {
  const [, error] = await sq.mutate(q => {
    if (isFollowing) return q.socialProfileUnfollow({ userId });
    return q.socialProfileFollow({ userId });
  });
  return !error || error?.length === 0;
};
