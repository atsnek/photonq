import { TProfile, TProfileStatType, TUser } from '../types/user';
import { sq } from '@snek-functions/origin';
import { snekResourceId } from '@atsnek/jaen';
import { produce } from 'immer';
import { TStoreSlice, TStoreState } from '../../../shared/types/store';
import { IProfileStateDefinition, TProfileSlice } from '../types/profileState';
import {
  buildUserActivities,
  changeUserFollowingState,
  getUserDisplayname
} from '../utils/user';
import {
  buildPostPreview,
  deletePost,
  searchPosts,
  togglePostRating
} from '../../../shared/utils/features/post';
import { TPaginatedPostListData, TPostPreview } from '../../post/types/post';
import { POST_FETCH_LIMIT } from '../../../contents/PostsContent';
import { asEnumKey } from 'snek-query';
import { PrivacyInputInput } from '@snek-functions/origin/dist/schema.generated';
import { USER_FETCH_LIMIT } from '../variables/user';
import { TAsyncListData } from '../../../shared/types/list';

const initState: IProfileStateDefinition = {
  activity: { items: [], totalCount: 0, state: 'loading' },
  overviewPosts: { state: 'loading', items: [], totalCount: 0 },
  searchPosts: { query: '', state: 'inactive', items: [], totalCount: 0 },
  starredPosts: { query: '', state: 'inactive', items: [], totalCount: 0 },
  followers: { items: [], totalCount: 0, state: 'loading' },
  followingUsers: { items: [], totalCount: 0, state: 'loading' },
  showcaseStarsPosts: { items: [], state: 'inactive' },
  showcaseLatestPosts: { items: [], state: 'inactive' },
  isFollowing: undefined,
  profile: undefined
};

export const createProfileSlice: TStoreSlice<TProfileSlice> = (set, get) => ({
  ...initState,
  fetchProfile: async username => {
    let isFollowing: boolean | undefined = undefined;
    const stats: { [key in TProfileStatType]: number } = {
      followers: 0,
      following: 0,
      views: 0,
      experiments: 0,
      starred: 0
    };

    const [currentUser, currentUserError] = await sq.query(q => q.userMe);

    const [userData, error] = await sq.query(
      (q): TProfile['user'] | undefined => {
        const user = q.user({
          resourceId: snekResourceId,
          login: username
        });
        const profile = user.profile;

        if (!currentUserError && currentUser && currentUser.id !== user.id) {
          isFollowing =
            !!profile?.followers &&
            profile
              ?.followers()
              ?.nodes.findIndex(f => f.follower.id === currentUser.id) !== -1;
        }

        if (profile) {
          stats.followers = profile.followers().totalCount;
          stats.following = profile.following().totalCount;
          stats.views = profile.views;
          stats.experiments = profile.posts().totalCount;
        }

        return {
          id: user.id,
          avatarUrl: user.details?.avatarURL ?? '',
          bio: profile?.bio ?? null,
          displayName: `${user.details?.firstName ?? ''} ${
            user.details?.lastName ?? ''
          }`,
          stats: {
            followers: profile?.followers().totalCount ?? 0,
            following: profile?.following().totalCount ?? 0,
            views: profile?.views ?? 0,
            experiments: profile?.posts().totalCount ?? 0,
            starred: profile?.starredPosts().totalCount ?? 0
          },
          username: username
        };
      }
    );

    if (error || !userData) return false;

    set(
      produce((state: TStoreState): void => {
        state.profile.profile = userData;
        state.profile.isFollowing = isFollowing;
      })
    );
    return true;
  },
  fetchOverviewPosts: async () => {
    if (!get().profile.profile) return false;

    const [currentUser] = await sq.query(q => q.userMe);

    const userId = get().profile.profile?.id;
    const [rawPosts, error] = await sq.query(q => {
      const posts = q.allSocialPostTrending({
        resourceId: __SNEK_RESOURCE_ID__,
        filters: { userId },
        first: 6
      });
      return posts.nodes
        .filter(
          p =>
            p.privacy === 'PUBLIC' ||
            (!!currentUser && userId === currentUser.id)
        )
        .map(p => buildPostPreview(q, p, currentUser));
    });

    set(
      produce((state: TStoreState): void => {
        state.profile.overviewPosts = {
          state: 'success',
          items: rawPosts ?? [],
          totalCount: 0
        };
      })
    );
    return !!error;
  },
  fetchActivity: async () => {
    if (!get().profile.profile) return false;

    const [currentUser] = await sq.query(q => q.userMe);

    const [activityData, activityDataError] = await sq.query(q => {
      const profile = q.user({
        resourceId: snekResourceId,
        login: get().profile.profile?.username
      }).profile;
      if (!profile) return undefined;

      const activity = profile.activity({
        first: 10,
        after: get().profile.activity.nextCursor
      });

      activity.pageInfo.endCursor;
      activity.pageInfo.hasNextPage;
      activity.pageInfo.startCursor;

      activity.edges.map(ae => {
        ae.node.type;
        for (const key in ae) {
          ae[key as keyof typeof ae];
        }

        for (const key in ae.node) {
          ae.node[key as keyof typeof ae.node];
        }

        if (ae.node.post !== null && 'id' in ae.node.post)
          for (const key in ae.node.post) {
            ae.node.post[key as keyof typeof ae.node.post];
          }

        ae.node.follow?.followed.id;
      });
      return activity;
    });
    if (!activityData || (activityDataError && activityDataError.length > 0))
      return false;

    const activities = await buildUserActivities(activityData, currentUser);
    set(
      produce((state: TStoreState): void => {
        state.profile.activity =
          state.profile.activity.totalCount === 0
            ? activities
            : {
                items: [...state.profile.activity.items, ...activities.items],
                totalCount: state.profile.activity.totalCount,
                nextCursor: activities.nextCursor,
                hasMore: activities.hasMore,
                state: 'success'
              };
      })
    );

    return true;
  },
  fetchSearchPosts: async (query, limit, offset, language, dateRange) => {
    set(
      produce((state: TStoreState) => {
        if (query !== state.profile.searchPosts.query) {
          // Reset the state if the query changed
          state.profile.searchPosts = {
            query,
            state: 'loading',
            items: [],
            hasMore: false,
            totalCount: 0
          };
        } else {
          state.profile.searchPosts.state = 'loading';
        }
      })
    );

    const [currentUser] = await sq.query(q => q.userMe);
    const currentProfile = get().profile.profile;
    if (!currentProfile) return;
    const isOwnProfile = !!currentUser && currentUser.id === currentProfile.id;

    let publicPosts: TPaginatedPostListData = {
      state: 'inactive',
      items: [],
      totalCount: 0
    };

    if (get().profile.searchPosts.publicPageInfo?.hasNextPage || offset === 0) {
      publicPosts = await searchPosts(
        query,
        isOwnProfile ? Math.ceil(limit / 2) : limit,
        'PUBLIC',
        offset === 0
          ? undefined
          : get().profile.searchPosts.publicPageInfo?.nextCursor,
        currentUser,
        currentProfile?.id,
        language ?? get().profile.searchPosts.language,
        dateRange ?? get().profile.searchPosts.dateRange
      );
    }

    let privatePosts: TPaginatedPostListData = {
      state: 'inactive',
      items: [],
      totalCount: 0
    };
    if (
      isOwnProfile &&
      (get().profile.searchPosts.privatePageInfo?.hasNextPage || offset === 0)
    ) {
      privatePosts = await searchPosts(
        query,
        Math.max(Math.ceil(limit / 2), limit - publicPosts.items.length),
        'PRIVATE',
        offset === 0
          ? undefined
          : get().profile.searchPosts.privatePageInfo?.nextCursor,
        currentUser,
        currentProfile?.id,
        language ?? get().profile.searchPosts.language,
        dateRange ?? get().profile.searchPosts.dateRange
      );
    }

    const combinedPosts = [...publicPosts.items, ...privatePosts.items];

    set(
      produce((state: TStoreState): void => {
        state.profile.searchPosts = {
          query,
          state: 'success',
          items:
            offset === 0
              ? combinedPosts
              : [...state.profile.searchPosts.items, ...combinedPosts],
          hasMore: publicPosts.hasMore || privatePosts.hasMore,
          privatePageInfo: {
            nextCursor: privatePosts.nextCursor,
            hasNextPage: privatePosts.hasMore
          },
          publicPageInfo: {
            nextCursor: publicPosts.nextCursor,
            hasNextPage: publicPosts.hasMore
          },
          totalCount:
            (publicPosts.totalCount ?? 0) + (privatePosts.totalCount ?? 0)
        };
      })
    );
  },
  fetchStarredPosts: async (query, limit, offset, language, dateRange) => {
    set(
      produce((state: TStoreState) => {
        if (
          query !== state.profile.starredPosts.query ||
          (dateRange &&
            dateRange?.from !== state.profile.starredPosts.dateRange?.from) ||
          dateRange?.to !== state.profile.starredPosts.dateRange?.to
        ) {
          // Reset the state if the query changed
          state.profile.starredPosts = {
            query,
            state: 'loading',
            items: [],
            hasMore: false,
            totalCount: 0
          };
        } else {
          state.profile.starredPosts.state = 'loading';
        }
      })
    );

    const profile = get().profile.profile;
    if (!profile) return false;

    const [currentUser] = await sq.query(q => q.userMe);

    const posts = await searchPosts(
      query,
      limit,
      'PUBLIC',
      offset === 0 ? undefined : get().profile.starredPosts.nextCursor,
      currentUser,
      profile.id,
      language ?? get().profile.searchPosts.language,
      dateRange ?? get().profile.searchPosts.dateRange,
      'starred'
    );

    set(
      produce((state: TStoreState) => {
        state.profile.starredPosts = {
          query,
          state: 'success',
          items:
            offset === 0
              ? posts.items
              : [...state.profile.starredPosts.items, ...posts.items],
          hasMore: posts.hasMore,
          totalCount: posts.totalCount,
          nextCursor: posts.nextCursor,
          dateRange: dateRange ?? get().profile.starredPosts.dateRange,
          language: language ?? get().profile.starredPosts.language
        };
        // Update the starred count in the profile stats if the current locale value is different from the remote one (which means that the user has starred or unstarred a post in the meantime on another tab)
        if (
          state.profile?.profile?.stats &&
          state.profile.profile.stats.starred !== posts.totalCount
        ) {
          state.profile.profile.stats.starred = posts.totalCount;
        }
      })
    );
    return true;
  },
  fetchFollowers: async () => {
    set(
      produce((state: TStoreState) => {
        state.profile.followers.state = 'loading';
      })
    );

    const [currentUser] = await sq.query(q => q.userMe);

    const profile = get().profile.profile;
    if (!profile) return false;

    const [followerConn, followerConnError] = await sq.query(q => {
      const followers = q
        .user({ id: profile.id, resourceId: __SNEK_RESOURCE_ID__ })
        .profile?.followers({
          first: USER_FETCH_LIMIT,
          after: get().profile.followers?.nextCursor
        });

      followers?.pageInfo.hasNextPage;
      followers?.pageInfo.endCursor;
      followers?.edges.map(fe => fe.node.follower.id);

      return followers;
    });
    if (followerConnError?.length > 0) return false;

    const followers = (await Promise.all(
      (followerConn?.edges ?? [])
        .map(fe => fe.node.follower.id)
        .map(async (id): Promise<TUser | undefined> => {
          const [user, userError] = await sq.query(q => {
            const user = q.user({ id, resourceId: __SNEK_RESOURCE_ID__ });

            user.id;
            user.details?.firstName;
            user.details?.lastName;
            user.details?.avatarURL;
            user.profile?.bio;
            user.username;
            user.profile?.followers().edges.map(fe => fe.node.follower.id);
            user.profile?.views;
            user.profile?.posts().totalCount;
            user.profile?.stars().totalCount;
            user.profile?.followers().totalCount;

            return user;
          });

          if (!user || userError?.length > 0) return undefined;

          return {
            id: user.id,
            avatarUrl: user.details?.avatarURL ?? '',
            bio: user.profile?.bio ?? null,
            displayName: getUserDisplayname(user),
            username: user.username,
            stats: {
              followers: user.profile?.followers().totalCount ?? 0,
              following: 0,
              experiments: user.profile?.posts().totalCount ?? 0,
              starred: 0,
              views: user.profile?.views ?? 0
            },
            isFollowing:
              currentUser &&
              !!user.profile
                ?.followers()
                .edges.find(fe => fe.node.follower.id === currentUser.id),
            isOwnProfile: currentUser?.id === user.id
          };
        })
        .filter(f => !!f)
    )) as TUser[]; // We need to tell TS that the filter will remove all undefined values
    if (!followers) return false;

    set(
      produce((state: TStoreState) => {
        state.profile.followers = {
          items: get().profile.followers?.items.concat(followers) ?? followers,
          totalCount: get().profile.followers?.totalCount ?? followers.length,
          nextCursor: followerConn?.pageInfo.endCursor ?? undefined,
          hasMore: followerConn?.pageInfo.hasNextPage ?? false,
          state: 'success'
        };
      })
    );

    return true;
  },
  fetchFollowingUsers: async () => {
    set(
      produce((state: TStoreState) => {
        state.profile.followingUsers.state = 'loading';
      })
    );

    const [currentUser] = await sq.query(q => q.userMe);

    const profile = get().profile.profile;
    if (!profile) return false;
    const isUserOnOwnProfile = currentUser?.id === profile.id;

    const [followingConn, followingConnError] = await sq.query(q => {
      const following = q
        .user({ id: profile.id, resourceId: __SNEK_RESOURCE_ID__ })
        .profile?.following({
          first: USER_FETCH_LIMIT,
          after: get().profile.followingUsers?.nextCursor
        });

      following?.pageInfo.hasNextPage;
      following?.pageInfo.endCursor;
      following?.edges.map(fe => fe.node.followed.id);

      return following;
    });
    if (followingConnError?.length > 0) return false;

    const followingUsers = (await Promise.all(
      (followingConn?.edges ?? [])
        .map(fe => fe.node.followed.id)
        .map(async (id): Promise<TUser | undefined> => {
          const [user, userError] = await sq.query(q => {
            const user = q.user({ id, resourceId: __SNEK_RESOURCE_ID__ });

            user.id;
            user.details?.firstName;
            user.details?.lastName;
            user.details?.avatarURL;
            user.profile?.bio;
            user.username;
            user.profile?.views;
            user.profile?.posts().totalCount;
            user.profile?.stars().totalCount;
            user.profile?.followers().totalCount;
            user.profile?.following().nodes.map(n => n.followed.id);

            return user;
          });

          if (!user || userError?.length > 0) return undefined;

          return {
            id: user.id,
            avatarUrl: user.details?.avatarURL ?? '',
            bio: user.profile?.bio ?? null,
            displayName: getUserDisplayname(user),
            username: user.username,
            stats: {
              followers: user.profile?.followers().totalCount ?? 0,
              following: 0,
              experiments: user.profile?.posts().totalCount ?? 0,
              starred: 0,
              views: user.profile?.views ?? 0
            },
            isFollowing:
              isUserOnOwnProfile ||
              (currentUser &&
                !!user.profile
                  ?.following()
                  .nodes.find(fe => fe.followed.id === currentUser.id)),
            isOwnProfile: user.id === currentUser.id
          };
        })
        .filter(f => !!f)
    )) as TUser[]; // We need to tell TS that the filter will remove all undefined values
    if (!followingUsers) return false;

    set(
      produce((state: TStoreState) => {
        state.profile.followingUsers = {
          items:
            get().profile.followingUsers?.items.concat(followingUsers) ??
            followingUsers,
          totalCount:
            get().profile.followingUsers?.totalCount ?? followingUsers.length,
          nextCursor: followingConn?.pageInfo.endCursor ?? undefined,
          hasMore: followingConn?.pageInfo.hasNextPage ?? false,
          state: 'success'
        };
      })
    );

    return true;
  },
  toggleFollow: async id => {
    const [currentUserId] = await sq.query(q => q.userMe.id);
    const [targetUser, targetUserErro] = await sq.query(q => {
      const user = q.user({
        resourceId: __SNEK_RESOURCE_ID__,
        id: id ?? get().profile.profile?.id
      });
      user.id;
      user.details?.lastName;
      user.profile?.followers().nodes.map(n => n.follower.id);
      return user;
    });
    const isFollowing =
      targetUser?.profile
        ?.followers()
        .nodes.findIndex(f => f.follower.id === currentUserId) !== -1;

    if (
      targetUserErro ||
      !currentUserId ||
      !targetUser.id ||
      currentUserId === targetUser.id
    )
      return false;

    const succeed = await changeUserFollowingState(targetUser.id, isFollowing);

    if (succeed) {
      set(
        produce((state: TStoreState): void => {
          if (id) {
            // If id is defined, we are following a different profile than the one being viewed
            const followerIdx = state.profile.followers.items.findIndex(
              f => f.id === id
            );
            if (followerIdx !== -1) {
              state.profile.followers.items[followerIdx].isFollowing =
                !isFollowing;
              if (
                state.profile.followers.items[followerIdx].stats?.followers ===
                undefined
              )
                return;
              state.profile.followers.items[followerIdx].stats!.followers +=
                isFollowing ? -1 : 1;
            }

            const followingIdx = state.profile.followingUsers.items.findIndex(
              f => f.id === id
            );
            if (followingIdx !== -1) {
              state.profile.followingUsers.items[followingIdx].isFollowing =
                !state.profile.followingUsers.items[followingIdx].isFollowing;
              if (
                state.profile.followingUsers.items[followingIdx].stats
                  ?.followers === undefined
              )
                return;
              state.profile.followingUsers.items[
                followingIdx
              ].stats!.followers += isFollowing ? -1 : 1;
            }

            // If the followed user's profile is the one being viewed, we need to update the state of it
            if (
              currentUserId === get().profile.profile?.id &&
              state.profile.profile?.stats?.following !== undefined
            ) {
              state.profile.profile.stats!.following += isFollowing ? -1 : 1;
            }
          } else {
            state.profile.isFollowing = !isFollowing;
            if (
              !state.profile.profile ||
              state.profile.profile.stats?.followers == undefined
            )
              return;
            state.profile.profile.stats.followers += isFollowing ? -1 : 1;
          }
        })
      );
    }

    return succeed;
  },
  fetchShowcaseLatestPosts: async () => {
    const profile = get().profile.profile;

    if (!profile) return false;

    const [currentUser] = await sq.query(q => q.userMe);

    set(
      produce((state: TStoreState) => {
        state.profile.showcaseLatestPosts.state = 'loading';
      })
    );

    const [posts, postsError] = await sq.query(q => {
      const user = q.user({
        id: get().profile.profile?.id,
        resourceId: __SNEK_RESOURCE_ID__
      }).profile;
      if (!user) return undefined;

      const posts = user.posts({ first: 2 });
      return posts.nodes.map(p => buildPostPreview(q, p, currentUser));
    });

    if (!posts || postsError?.length > 0) return false;

    set(
      produce((state: TStoreState) => {
        state.profile.showcaseLatestPosts.state = 'success';
        state.profile.showcaseLatestPosts.items = posts;
      })
    );
    return true;
  },
  fetchShowcaseStarsPosts: async () => {
    const profile = get().profile.profile;

    if (!profile) return false;

    const [currentUser] = await sq.query(q => q.userMe);

    set(
      produce((state: TStoreState) => {
        state.profile.showcaseStarsPosts.state = 'loading';
      })
    );

    const [posts, postsError] = await sq.query(q => {
      const posts = q.allSocialPostTrending({
        resourceId: __SNEK_RESOURCE_ID__,
        first: 2,
        filters: { userId: profile.id }
      });
      return posts.nodes.map(p => buildPostPreview(q, p, currentUser));
    });

    if (!posts || postsError?.length > 0) return false;

    set(
      produce((state: TStoreState) => {
        state.profile.showcaseStarsPosts.state = 'success';
        state.profile.showcaseStarsPosts.items = posts;
      })
    );
    return true;
  },
  changeBio: async bio => {
    if (!get().profile.profile) return false;
    if (bio === get().profile.profile?.bio) return true;
    const [, err] = await sq.mutate(m =>
      m.socialProfileUpdate({ values: { bio } })
    );

    const succeed = !err || err.length === 0;

    if (succeed) {
      set(
        produce((state: TStoreState): void => {
          state.profile.profile!.bio = bio;
        })
      );
    }

    return succeed;
  },
  changeProfilePicture: avatarFile => {
    if (!get().profile.profile) return false;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(avatarFile);

    fileReader.onload = () => {
      set(
        produce((state: TStoreState): void => {
          state.profile.profile!.avatarUrl = fileReader.result as string;
        })
      );
    };
    return true;
  },
  togglePostRating: async (id, source) => {
    let hasRated = false;

    switch (source) {
      case 'overview':
        hasRated =
          get().profile.overviewPosts.items.find(p => p.id === id)?.hasRated ??
          false;
        break;
      case 'experiments':
        hasRated =
          get().profile.searchPosts.items.find(p => p.id === id)?.hasRated ??
          false;
        break;
      case 'showcase_latest':
        hasRated =
          get().profile.showcaseLatestPosts.items.find(p => p.id === id)
            ?.hasRated ?? false;
        break;
      case 'showcase_stars':
        hasRated =
          get().profile.showcaseStarsPosts.items.find(p => p.id === id)
            ?.hasRated ?? false;
        break;
      case 'stars':
        hasRated =
          get().profile.starredPosts.items.find(p => p.id === id)?.hasRated ??
          false;
        break;
      default:
        hasRated =
          get().profile.searchPosts.items.find(p => p.id === id)?.hasRated ??
          false;
        break;
    }

    if (hasRated === undefined) return false;

    const succeed = await togglePostRating(id, hasRated ?? false);

    if (succeed) {
      set(
        produce((state: TStoreState) => {
          [
            state.profile.overviewPosts.items,
            state.profile.showcaseStarsPosts,
            state.profile.showcaseLatestPosts,
            state.profile.starredPosts.items,
            state.profile.searchPosts.items
          ].forEach(posts => {
            const post = ('state' in posts ? posts.items : posts).find(
              p => p.id === id
            );
            if (post) {
              post.hasRated = !post.hasRated;
              post.stars += post.hasRated ? 1 : -1;
            }
          });
        })
      );
    }

    return succeed;
  },
  setPostListLanguage: (postList = 'all-experiments', language) => {
    const isDefaultPostsList = postList === 'all-experiments'; // Temporary until we have more than 2 different post lists
    set(
      produce((state: TStoreState) => {
        if (isDefaultPostsList) {
          state.profile.searchPosts.language = language;
          state.profile.searchPosts.nextCursor = undefined;
        } else {
          state.profile.starredPosts.language = language;
          state.profile.starredPosts.nextCursor = undefined;
        }
      })
    );

    if (isDefaultPostsList) {
      get().profile.fetchSearchPosts(
        get().profile.searchPosts.query,
        POST_FETCH_LIMIT,
        0,
        language
      );
    } else {
      get().profile.fetchStarredPosts(
        get().profile.starredPosts.query,
        POST_FETCH_LIMIT,
        0,
        language
      );
    }
  },
  setPostListDateRange: (from, to, postList) => {
    const isAllPosts = postList === 'all-experiments'; // Temporary until we have more than 2 different post lists
    set(
      produce((state: TStoreState) => {
        // null is only used to reset the date
        // undefined is used to keep the current value
        // a date value is used to set the date
        if (from !== undefined) {
          if (isAllPosts) {
            if (!state.profile.searchPosts.dateRange) {
              state.profile.searchPosts.dateRange = {
                from: from ?? undefined,
                to: undefined
              };
            }
            state.profile.searchPosts.dateRange.from = from ?? undefined;
          } else if (!isAllPosts) {
            if (!state.profile.starredPosts.dateRange) {
              state.profile.starredPosts.dateRange = {
                from: from ?? undefined,
                to: undefined
              };
            } else {
              state.profile.starredPosts.dateRange.from = from ?? undefined;
            }
          }
        }

        if (to !== undefined) {
          if (isAllPosts) {
            if (!state.profile.searchPosts.dateRange) {
              state.profile.searchPosts.dateRange = {
                from: undefined,
                to: to ?? undefined
              };
            } else {
              state.profile.searchPosts.dateRange.to = to ?? undefined;
            }
            state.profile.searchPosts.dateRange.to = to ?? undefined;
          } else if (!isAllPosts) {
            if (!state.profile.starredPosts.dateRange) {
              state.profile.starredPosts.dateRange = {
                from: undefined,
                to: to ?? undefined
              };
            } else {
              state.profile.starredPosts.dateRange.to = to ?? undefined;
            }
          }
        }
        state.profile.searchPosts.nextCursor = undefined;
      })
    );

    const newDateRange = {
      from:
        from ??
        (isAllPosts
          ? get().profile.searchPosts.dateRange?.from
          : get().profile.starredPosts.dateRange?.from),
      to:
        to ??
        (isAllPosts
          ? get().profile.searchPosts.dateRange?.to
          : get().profile.starredPosts.dateRange?.to)
    };

    if (isAllPosts) {
      get().profile.fetchSearchPosts(
        get().profile.searchPosts.query,
        POST_FETCH_LIMIT,
        0,
        undefined,
        newDateRange
      );
    } else {
      get().profile.fetchStarredPosts(
        get().profile.starredPosts.query,
        POST_FETCH_LIMIT,
        0,
        undefined,
        newDateRange
      );
    }
  },
  togglePostPrivacy: async (postId, privacy) => {
    if (!get().profile.profile) return false;
    const [, err] = await sq.mutate(m =>
      m.socialPostUpdate({
        postId,
        values: { privacy: asEnumKey(PrivacyInputInput, privacy) }
      })
    );

    if (err?.length === 0) return false;

    set(
      produce((state: TStoreState): void => {
        [
          state.profile.overviewPosts.items,
          state.profile.showcaseStarsPosts,
          state.profile.showcaseLatestPosts,
          state.profile.searchPosts.items
        ].forEach(posts => {
          const post = ('state' in posts ? posts.items : posts).find(
            p => p.id === postId
          );
          if (!post) return;
          post.privacy = privacy;
        });
      })
    );

    return true;
  },
  deletePost: async id => {
    const succeed = deletePost(id);
    if (!succeed) return false;

    const doesSectionPostExist = (
      id: TPostPreview['id'],
      section: TPaginatedPostListData | TAsyncListData<TPostPreview>
    ) => section.items.findIndex(p => p.id === id) !== -1;

    if (doesSectionPostExist(id, get().profile.overviewPosts)) {
      get().profile.fetchOverviewPosts();
    }
    if (doesSectionPostExist(id, get().profile.searchPosts)) {
      get().profile.fetchSearchPosts(
        get().profile.searchPosts.query,
        POST_FETCH_LIMIT,
        0,
        get().profile.searchPosts.language,
        get().profile.searchPosts.dateRange
      );
    }
    if (doesSectionPostExist(id, get().profile.starredPosts)) {
      get().profile.fetchStarredPosts(
        get().profile.starredPosts.query,
        POST_FETCH_LIMIT,
        0,
        get().profile.starredPosts.language,
        get().profile.starredPosts.dateRange
      );
    }
    if (doesSectionPostExist(id, get().profile.showcaseLatestPosts)) {
      get().profile.fetchShowcaseLatestPosts();
    }

    return succeed;
  },
  reset: () => {
    set(
      produce((state: TStoreState) => {
        state.profile.activity = initState.activity;
        state.profile.overviewPosts = initState.overviewPosts;
        state.profile.profile = initState.profile;
        state.profile.searchPosts = initState.searchPosts;
        state.profile.starredPosts = initState.starredPosts;
        state.profile.isFollowing = initState.isFollowing;
      })
    );
  }
});
