import { Edge_1_2_3_4, Nodes_1_2_3_4, ObjectAndUser, Privacy, Query, User } from "@snek-functions/origin/dist/schema.generated";
import { TActivity, TActivityType } from "../activity/types/activity";
import { t } from "snek-query";
import { sq } from "@snek-functions/origin";
import { TPaginationData } from "../../../shared/types/pagination";

/**
 * Returns the display name of a user
 * @param user The user to get the display name of
 * @returns The display name of the user
 * @example getDisplayname({ username: "test", details: { firstName: "Test", lastName: "User" } }) // "Test User"
 * @example getDisplayname({ username: "test", details: { firstName: "Test" } }) // "Test"
 * @example getDisplayname({ username: "test", details: { lastName: "User" } }) // "User"
 * @example getDisplayname({ username: "test" }) // "test"
 */
export const getUserDisplayname = (user: ObjectAndUser) => {
    let displayName: string | undefined = undefined;
    if (user.details?.firstName) {
        displayName = user.details.firstName;
    }
    if (user.details?.lastName) {
        if (displayName) displayName += ` ${user.details.lastName}`;
        else displayName = user.details.lastName;
    }

    if (!displayName) {
        displayName = user.username;
    }
    return displayName;
}

/**
 * Builds the activity section for a user (profile)
 * @param q  The query object 
 * @param activities  The activities to build the section from
 * @returns One or more activity sections
 */
export const buildUserActivities = (q: Query, activityEdges: Edge_1_2_3_4[], currentUser: t.Nullable<User>): TPaginationData<TActivity[]> => {
    // Only show the most recent rating for a post
    const activityRatingPostIds: Array<{ createdAt: string, id: string }> = [];
    activityEdges.filter(ae => ae.node.type.startsWith("star")).sort((a, b) => {
        if (!a.node.createdAt || !b.node.createdAt) return 0;
        return new Date(a.node.createdAt).getTime() - new Date(b.node.createdAt).getTime();
    }).forEach(ae => {
        const { createdAt, post, type } = ae.node;
        if (!post) return;
        const pos = activityRatingPostIds.findIndex(({ id }) => id === post.id);
        const isUnstar = type === "star_unstar";
        if (pos !== -1) {
            if (new Date(activityRatingPostIds[pos].createdAt) > new Date(createdAt)) return;
            if (type === "star_unstar") {
                activityRatingPostIds.splice(pos, 1);
                return;
            }
            activityRatingPostIds[pos].createdAt = createdAt;
        }
        else if (!isUnstar) activityRatingPostIds.push({ createdAt, id: post.id });
    })

    const activityList: TPaginationData<TActivity[]> = {
        items: [],
        totalCount: activityEdges.length,
    };

    activityEdges.forEach(async (ae) => {
        const { createdAt, post, type, follow } = ae.node;
        //! Because of snek-query, we must access all post props we need here, otherwise it won't be fetched
        post?.slug;
        post?.title;
        post?.privacy;
        post?.profileId;
        if (!createdAt || (type.startsWith("star_") && post && activityRatingPostIds.findIndex(({ createdAt: existingCreatedAt, id }) => id === post.id && existingCreatedAt === createdAt)) === -1) return;

        let title = '';
        let href = '';
        if (type === 'blog_create' && post) {
            if (post.privacy === Privacy.PRIVATE && post.profileId !== currentUser?.id) {
                title = "Created a private blog post";
                href = "#";
            } else {
                title = `Created a blog post \"${post.title?.substring(0, 20)}${post.title?.length > 20 ? '...' : ''
                    }\"`;
                href = '/post/' + post.slug;
            }
        } else if (type === 'profile_create') {
            title = `Joined the community`;
            href = '#';
        } else if (type === 'follow_follow') {
            if (!follow || !follow.followed) return;
            const followedUser = q.user({ id: follow.followed.id });
            if (!followedUser) return;
            title = `Followed ${getUserDisplayname(followedUser)}`;
            href = (follow.followed?.id) ? '/user/' + follow.followed?.id : '#';
        } else if (type === 'star_star' && post) {
            title = `Starred a post \"${post.title?.substring(0, 20)}${post.title?.length > 20 ? '...' : ''
                }\"`;
            href = '/post/' + post.slug;
        }

        activityList.items.push({
            type: type as TActivityType,
            timestamp: createdAt,
            title: {
                name: title,
                href
            }
        })
    });
    return activityList;
}

/**
 * Follow or unfollow a user
 * @param userId The user id to follow or unfollow
 * @param isFollowing Whether the user is currently following the user or not. (f.e. if the user is following the user right now, this should be true)
 * @returns Whether the request was successful or not
 */
export const changeUserFollowingState = async (userId: string, isFollowing: boolean): Promise<boolean> => {
    const [, error] = await sq.mutate(q => {
        if (isFollowing) return q.socialProfileUnfollow({ userId });
        return q.socialProfileFollow({ userId });
    })
    return !error || error?.length === 0;
}