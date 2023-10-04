import { TProfile } from '../types/user';
import { sq } from '@snek-functions/origin';
import { produce } from 'immer';
import { TStoreSlice, TStoreState } from '../../../shared/types/store';
import { IProfileStateDefinition, TProfileSlice } from '../types/profileState';
import { buildUserActivities, changeUserFollowingState } from '../utils/user';
import { useAppStore } from '../../../shared/store/store';
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
  searchPostLanguage: undefined,
  searchPostsDateRange: { from: undefined, to: undefined },
  stats: {
    followers: 0,
    views: 0,
    stars: 0
  },
  isFollowing: undefined,
  profile: undefined
};

export const createProfileSlice: TStoreSlice<TProfileSlice> = (set, get) => ({
  ...initState,
  fetchProfile: async username => {
    let isFollowing: boolean | undefined = undefined;
    const stats: TProfileSlice['stats'] = {
      followers: 0,
      views: 0,
      stars: 0
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
          stats.views = profile.views;
        }

        return {
          id: user.id,
          avatarUrl: user.details?.avatarURL ?? '',
          bio: profile?.bio ?? null,
          displayName: `${user.details?.firstName ?? ''} ${user.details?.lastName ?? ''
            }`,
          socials: [],
          username: username
        };
      }
    );

    if (error || !userData) return false;

    set(
      produce((state: TStoreState): void => {
        state.profile.profile = userData;
        state.profile.isFollowing = isFollowing;
        state.profile.stats = stats;
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

    const [, error] = await sq.query(q => {
      const user = q.user({
        resourceId: __SNEK_RESOURCE_ID__,
        login: get().profile.profile?.username
      });
      const profile = user.profile;

      const activityList = buildUserActivities(
        q,
        profile?.activity({
          first: 10,
          after: get().profile.activity.nextCursor
        }).edges ?? [],
        currentUser
      );
      activityList.nextCursor =
        profile?.activity().pageInfo.endCursor ?? undefined;
      activityList.hasMore = profile?.activity().pageInfo.hasNextPage ?? false;
      set(
        produce((state: TStoreState): void => {
          state.profile.activity =
            state.profile.activity.totalCount === 0
              ? activityList
              : {
                items: [
                  ...state.profile.activity.items,
                  ...activityList.items
                ],
                totalCount: state.profile.activity.totalCount,
                nextCursor: activityList.nextCursor,
                hasMore: activityList.hasMore
              };
        })
      );
    });

    return !!error;
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
    const currentProfile = useAppStore.getState().profile.profile;
    if (!currentProfile) return;
    const isOwnProfile = !!currentUser && currentUser.id === currentProfile.id;

    const publicPosts = await searchPosts(
      query,
      isOwnProfile ? Math.ceil(limit / 2) : limit,
      'PUBLIC',
      offset === 0
        ? undefined
        : get().profile.searchPosts.publicPageInfo?.nextCursor,
      currentUser,
      currentProfile?.id,
      language ?? get().profile.searchPostLanguage,
      dateRange ?? get().profile.searchPostsDateRange
    );

    let privatePosts: TPaginatedPostListData = {
      state: 'inactive',
      items: [],
      totalCount: 0
    };
    if (isOwnProfile) {
      privatePosts = await searchPosts(
        query,
        Math.max(Math.ceil(limit / 2), limit - publicPosts.items.length),
        'PRIVATE',
        offset === 0
          ? undefined
          : get().profile.searchPosts.privatePageInfo?.nextCursor,
        currentUser,
        currentProfile?.id,
        language ?? get().profile.searchPostLanguage,
        dateRange ?? get().profile.searchPostsDateRange
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
          state.profile.stats.followers += get().profile.isFollowing ? -1 : 1;
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
    const hasRated =
      source === 'overview'
        ? get().profile.overviewPosts.items.find(p => p.id === id)?.hasRated
        : get().profile.searchPosts.items.find(p => p.id === id)?.hasRated;

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
  setSearchPostLanguage: language => {
    set(
      produce((state: TStoreState) => {
        state.profile.searchPostLanguage = language;
        state.profile.searchPosts.nextCursor = undefined;
      })
    );

    get().profile.fetchSearchPosts(
      get().profile.searchPosts.query,
      POST_FETCH_LIMIT,
      0,
      language
    );
  },
  setSearchPostsDateRange: (from, to) => {
    set(
      produce((state: TStoreState) => {
        // null is only used to reset the date
        // undefined is used to keep the current value
        // a date value is used to set the date
        if (from !== undefined)
          state.profile.searchPostsDateRange.from = from ?? undefined;
        if (to !== undefined)
          state.profile.searchPostsDateRange.to = to ?? undefined;

        state.profile.searchPosts.nextCursor = undefined;
      })
    );

    const searchPostsDateRange = {
      from: from ?? get().profile.searchPostsDateRange.from,
      to: to ?? get().profile.searchPostsDateRange.to
    };

    get().profile.fetchSearchPosts(
      get().profile.searchPosts.query,
      POST_FETCH_LIMIT,
      0,
      undefined,
      searchPostsDateRange
    );
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
        state.profile.searchPostLanguage = initState.searchPostLanguage;
        state.profile.searchPostsDateRange = initState.searchPostsDateRange;
        state.profile.stats = initState.stats;
        state.profile.isFollowing = initState.isFollowing;
      })
    );
  }
});
