import { TProfile, TProfileStatType, TUser } from '../types/user';
import { sq } from '@snek-functions/origin';
import { produce } from 'immer';
import { TStoreSlice, TStoreState } from '../../../shared/types/store';
import { IProfileStateDefinition, TProfileSlice } from '../types/profileState';
import { buildUserActivities, changeUserFollowingState, getUserDisplayname } from '../utils/user';
import {
  buildPostPreview,
  searchPosts,
  togglePostRating
} from '../../../shared/utils/features/post';
import { TPaginatedPostListData } from '../../post/types/post';
import { POST_FETCH_LIMIT } from '../../../contents/PostsContent';
import { asEnumKey } from 'snek-query';
import { PrivacyInputInput } from '@snek-functions/origin/dist/schema.generated';

const initState: IProfileStateDefinition = {
  activity: { items: [], totalCount: 0 },
  overviewPosts: { state: 'loading', items: [], totalCount: 0 },
  searchPosts: { query: '', state: 'inactive', items: [], totalCount: 0 },
  starredPosts: { query: '', state: 'inactive', items: [], totalCount: 0 },
  followers: { items: [], totalCount: 0 },
  followingUsers: { items: [], totalCount: 0 },
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
      posts: 0,
      starred: 0,
    };

    const [currentUser, currentUserError] = await sq.query(q => q.userMe);

    const [userData, error] = await sq.query(
      (q): TProfile['user'] | undefined => {
        const user = q.user({
          resourceId: __SNEK_RESOURCE_ID__,
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
          stats.posts = profile.posts().totalCount;
        }

        return {
          id: user.id,
          avatarUrl: user.details?.avatarURL ?? '',
          bio: profile?.bio ?? null,
          displayName: `${user.details?.firstName ?? ''} ${user.details?.lastName ?? ''
            }`,
          stats: {
            followers: profile?.followers().totalCount ?? 0,
            following: profile?.following().totalCount ?? 0,
            views: profile?.views ?? 0,
            posts: profile?.posts().totalCount ?? 0,
            starred: profile?.starredPosts().totalCount ?? 0,
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
      const posts = q.allSocialPostTrending({ filters: { userId }, first: 6 });
      posts?.pageInfo.hasNextPage;
      posts?.pageInfo.endCursor;
      posts?.nodes.forEach(pn => {
        try {
          pn.stars().edges.map(se => se.node.profile.id);
          pn.stars().totalCount;
          for (const key in pn) {
            pn[key as keyof typeof pn];
          }
        } catch { }
      });
      return posts;
    });

    const posts = await Promise.all(
      rawPosts?.nodes
        .filter(
          ({ privacy }) =>
            privacy === 'PUBLIC' || (!!currentUser && userId === currentUser.id)
        )
        .map(async p => {
          return (await sq.query(q => buildPostPreview(q, p, currentUser)))[0];
        }) ?? []
    );

    set(
      produce((state: TStoreState): void => {
        state.profile.overviewPosts = {
          state: 'success',
          items: posts,
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
      const profile = q.user({ resourceId: __SNEK_RESOURCE_ID__, login: get().profile.profile?.username }).profile;
      if (!profile) return undefined;

      const activity = profile.activity({ first: 10, after: get().profile.activity.nextCursor });

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
      })
      return activity;
    });
    if (!activityData || (activityDataError && activityDataError.length > 0)) return false;

    const activities = await buildUserActivities(activityData, currentUser);
    set(
      produce((state: TStoreState): void => {
        state.profile.activity =
          state.profile.activity.totalCount === 0
            ? activities
            : {
              items: [
                ...state.profile.activity.items,
                ...activities.items
              ],
              totalCount: state.profile.activity.totalCount,
              nextCursor: activities.nextCursor,
              hasMore: activities.hasMore
            };
      }));

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
            totalCount: 0,
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
    }


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
    if (isOwnProfile && (get().profile.searchPosts.privatePageInfo?.hasNextPage || offset === 0)) {
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
        if (query !== state.profile.starredPosts.query || (dateRange && dateRange?.from !== state.profile.starredPosts.dateRange?.from || dateRange?.to !== state.profile.starredPosts.dateRange?.to)) {
          // Reset the state if the query changed
          state.profile.starredPosts = {
            query,
            state: 'loading',
            items: [],
            hasMore: false,
            totalCount: 0,
          };
        } else {
          state.profile.starredPosts.state = 'loading';
        }
      })
    );

    const profile = get().profile.profile;
    if (!profile) return false;

    const [currentUser] = await sq.query(q => q.userMe);

    console.log("dateRange: ", dateRange ?? get().profile.starredPosts.dateRange);

    const posts = await searchPosts(query, limit, 'PUBLIC', offset === 0 ? undefined : get().profile.starredPosts.nextCursor, currentUser, profile.id, language ?? get().profile.searchPosts.language, dateRange ?? get().profile.searchPosts.dateRange, 'starred');

    set(produce((state: TStoreState) => {
      state.profile.starredPosts = {
        query,
        state: 'success',
        items: offset === 0 ? posts.items : [...state.profile.starredPosts.items, ...posts.items],
        hasMore: posts.hasMore,
        totalCount: posts.totalCount,
        nextCursor: posts.nextCursor,
        dateRange: dateRange ?? get().profile.starredPosts.dateRange,
        language: language ?? get().profile.starredPosts.language,
      };
    }))
    return true;
  },
  fetchFollowers: async () => {

    const [currentUser] = await sq.query(q => q.userMe);

    const profile = get().profile.profile;

    if (!profile) return false;

    const [followerIds, followerIdsError] = await sq.query(q => {
      const followers = q.user({ id: profile.id }).profile?.followers({ first: 10, after: get().profile.followers?.nextCursor });

      return followers?.edges.map(fe => fe.node.follower.id);
    })

    if (followerIdsError?.length > 0) return false;

    const followers = await Promise.all((followerIds ?? []).map(async (id): Promise<TUser | undefined> => {
      const [user, userError] = await sq.query(q => {
        const user = q.user({ id });

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
        user.profile?.following().nodes.map(n => n.id);

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
          posts: user.profile?.posts().totalCount ?? 0,
          starred: 0,
          views: user.profile?.views ?? 0,
        },
        isFollowing: currentUser && !!user.profile?.followers().edges.find(fe => fe.node.follower.id === currentUser.id),
        isOwnProfile: currentUser?.id === user.id,
      }
    }).filter(f => !!f)) as TUser[]; // We need to tell TS that the filter will remove all undefined values

    if (!followers) return false;

    set(produce((state: TStoreState) => {
      state.profile.followers = {
        items: get().profile.followers?.items.concat(followers) ?? followers,
        totalCount: get().profile.followers?.totalCount ?? followers.length,
        nextCursor: followers.length === 0 ? undefined : followers[followers.length - 1].id,
        hasMore: followers.length === 10
      }
    }));

    return true;
  },
  fetchFollowingUsers: async () => {
    return true;
  },
  toggleFollow: async () => {
    const [currentUserId] = await sq.query(q => q.userMe.id);
    const [currentProfileId, profileError] = await sq.query(
      q =>
        q.user({
          resourceId: __SNEK_RESOURCE_ID__,
          id: get().profile.profile?.id
        }).id
    );

    if (
      profileError ||
      !currentUserId ||
      !currentProfileId ||
      currentUserId === currentProfileId
    )
      return false;

    const succeed = await changeUserFollowingState(
      currentProfileId,
      get().profile.isFollowing ?? false
    );

    if (succeed) {
      set(
        produce((state: TStoreState): void => {
          state.profile.isFollowing = !get().profile.isFollowing;
          if (!state.profile.profile || !state.profile.profile.stats?.followers) return;
          state.profile.profile.stats.followers += get().profile.isFollowing ? -1 : 1;
        })
      );
    }

    return succeed;
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
  togglePostRating: async (id, source) => {
    let hasRated = false;

    if (source === 'overview') {
      hasRated = get().profile.overviewPosts.items.find(p => p.id === id)?.hasRated ?? false;
    } else if (source === 'posts') {
      hasRated = get().profile.searchPosts.items.find(p => p.id === id)?.hasRated ?? false;
    } else {
      hasRated = get().profile.searchPosts.items.find(p => p.id === id)?.hasRated ?? false;
    }

    if (hasRated === undefined) return false;

    const succeed = await togglePostRating(id, hasRated ?? false);

    if (succeed) {
      set(
        produce((state: TStoreState) => {
          if (source === 'overview') {
            const post = state.profile.overviewPosts.items.find(
              p => p.id === id
            );
            if (post) {
              post.hasRated = !post.hasRated;
              post.stars += post.hasRated ? 1 : -1;
            }
          } else if (source === 'posts') {
            const post = state.profile.searchPosts.items.find(p => p.id === id);
            if (post) {
              post.hasRated = !post.hasRated;
              post.stars += post.hasRated ? 1 : -1;
            }
          } else {
            const post = state.profile.searchPosts.items.find(p => p.id === id);
            if (post) {
              post.hasRated = !post.hasRated;
              post.stars += post.hasRated ? 1 : -1;
            }
          }
        })
      );
    }

    return succeed;
  },
  setPostListLanguage: (postList = 'all-posts', language) => {
    const isDefaultPostsList = postList === 'all-posts'; // Temporary until we have more than 2 different post lists
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
    const isAllPosts = postList === 'all-posts'; // Temporary until we have more than 2 different post lists
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
      from: from ?? (isAllPosts ? get().profile.searchPosts.dateRange?.from : get().profile.starredPosts.dateRange?.from),
      to: to ?? (isAllPosts ? get().profile.searchPosts.dateRange?.to : get().profile.starredPosts.dateRange?.to)
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

    const postIdx = [
      get().profile.searchPosts.items.findIndex(p => p.id === postId),
      get().profile.overviewPosts.items.findIndex(p => p.id === postId)
    ];

    if (
      get().profile.searchPosts.items[postIdx[0]]?.privacy === privacy ||
      get().profile.overviewPosts.items[postIdx[1]]?.privacy === privacy
    )
      return true;

    const [, err] = await sq.mutate(m =>
      m.socialPostUpdate({
        postId,
        values: { privacy: asEnumKey(PrivacyInputInput, privacy) }
      })
    );

    if (err?.length === 0) return false;

    set(
      produce((state: TStoreState): void => {
        if (postIdx[0] !== -1)
          state.profile.searchPosts.items[postIdx[0]].privacy = privacy;
        if (postIdx[1] !== -1)
          state.profile.overviewPosts.items[postIdx[1]].privacy = privacy;
      })
    );

    return true;
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
