import { sq } from '@snek-functions/origin';
import { TStoreSlice, TStoreState } from '../../../shared/types/store';
import { TCommunityPostsSlice } from '../types/communityPostsState';
import { produce } from 'immer';
import {
  buildPostPreview,
  deletePost,
  searchPosts
} from '../../../shared/utils/features/post';
import { asEnumKey } from 'snek-query';
import {
  FiltersInput_1Input,
  LanguageInputInput,
  PrivacyInputInput
} from '@snek-functions/origin/dist/schema.generated';
import { POST_FETCH_LIMIT } from '../../../contents/PostsContent';
import { snekResourceId } from '@atsnek/jaen';

export const createCommunityPostsSlice: TStoreSlice<TCommunityPostsSlice> = (
  set,
  get
) => ({
  featuredPosts: { state: 'loading', items: [], totalCount: 0 },
  latestPosts: { state: 'loading', items: [], totalCount: 0 },
  searchPosts: { state: 'inactive', items: [], totalCount: 0, query: '' },
  postLanguage: undefined,
  dateRange: { from: undefined, to: undefined },
  fetchFeaturedPosts: async silent => {
    if (!silent) {
      set(
        produce((state: TStoreState) => {
          state.communityPosts.featuredPosts = {
            items: [],
            totalCount: 0,
            nextCursor: undefined,
            prevCursor: undefined,
            hasMore: false,
            state: 'loading'
          };
        })
      );
    }

    const [currentUser] = await sq.query(q => q.userMe);

    const filters: FiltersInput_1Input = {};
    const postLanguage = get().communityPosts.postLanguage;
    if (postLanguage) {
      filters.language = asEnumKey(LanguageInputInput, postLanguage);
    }

    const [posts, postsError] = await sq.query(q => {
      const postComm = q.allSocialPostTrending({ resourceId: __SNEK_RESOURCE_ID__, first: 4, filters });
      return postComm?.nodes.map(pn => buildPostPreview(q, pn, currentUser)) ?? [];
    });

    if (postsError?.length > 0) return;
    set(
      produce((state: TStoreState) => {
        state.communityPosts.featuredPosts = {
          state: 'success',
          items: posts,
          totalCount: posts.length
        };
      })
    );
  },
  fetchLatestPosts: async (silent, reload) => {
    if (reload) {
      set(
        produce((state: TStoreState) => {
          state.communityPosts.latestPosts = {
            items: [],
            totalCount: 0,
            nextCursor: undefined,
            prevCursor: undefined,
            hasMore: false,
            state: 'loading'
          };
        })
      );
    } else if (!silent) {
      set(
        produce((state: TStoreState) => {
          state.communityPosts.latestPosts.state = 'loading';
        })
      );
    }

    const [currentUser] = await sq.query(q => q.userMe);

    const filters: FiltersInput_1Input = {
      privacy: asEnumKey(PrivacyInputInput, 'PUBLIC')
    };

    if (get().communityPosts.postLanguage) {
      filters.language = asEnumKey(
        LanguageInputInput,
        get().communityPosts.postLanguage!
      );
    }

    const [posts, postsError] = await sq.query(q => {
      const postComm = q.allSocialPost({
        resourceId: __SNEK_RESOURCE_ID__,
        first: POST_FETCH_LIMIT,
        after:
          get().communityPosts.latestPosts.hasMore && !reload
            ? get().communityPosts.latestPosts.nextCursor
            : undefined,
        filters
      });
      postComm?.pageInfo.endCursor;
      postComm?.pageInfo.hasNextPage;
      postComm?.pageInfo.hasPreviousPage;
      postComm?.pageInfo.startCursor;
      return {
        hasPreviousPage: postComm?.pageInfo.hasPreviousPage,
        hasNextPage: postComm?.pageInfo.hasNextPage,
        startCursor: postComm?.pageInfo.startCursor,
        endCursor: postComm?.pageInfo.endCursor,
        totalCount: postComm?.totalCount,
        items: postComm?.nodes.map(pn => buildPostPreview(q, pn, currentUser))
      }
    });

    if (postsError?.length > 0) return;
    set(
      produce((state: TStoreState) => {
        state.communityPosts.latestPosts = {
          state: 'success',
          items: posts.hasPreviousPage
            ? [...state.communityPosts.latestPosts.items, ...posts.items]
            : posts.items,
          itemsPerPage: POST_FETCH_LIMIT,
          totalCount: posts.totalCount,
          nextCursor:
            posts.hasNextPage &&
              posts.endCursor
              ? posts.endCursor
              : undefined,
          prevCursor:
            posts.hasPreviousPage &&
              posts.startCursor
              ? posts.startCursor
              : undefined,
          hasMore: posts.hasNextPage ?? false
        };
      })
    );
  },
  fetchSearchPosts: async (query, limit, offset, language, dateRange) => {
    if (!query.length) {
      set(
        produce((state: TStoreState) => {
          state.communityPosts.searchPosts = {
            state: 'inactive',
            items: [],
            totalCount: 0,
            query: query
          };
        })
      );
      return;
    }

    set(
      produce((state: TStoreState) => {
        if (query !== state.communityPosts.searchPosts.query) {
          // Reset the state if the query changed
          state.communityPosts.searchPosts = {
            query,
            state: 'loading',
            items: [],
            hasMore: false,
            totalCount: 0
          };
        } else {
          state.communityPosts.searchPosts.state = 'loading';
        }
      })
    );

    const [currentUser] = await sq.query(q => q.userMe);

    const posts = await searchPosts(
      query,
      limit,
      'PUBLIC',
      get().communityPosts.searchPosts.nextCursor,
      currentUser,
      undefined,
      language ?? get().communityPosts.postLanguage,
      dateRange ?? get().communityPosts.dateRange
    );

    set(
      produce((state: TStoreState) => {
        state.communityPosts.searchPosts = {
          state: 'success',
          items:
            offset === 0
              ? posts.items
              : [...state.communityPosts.searchPosts.items, ...posts.items],
          hasMore: posts.hasMore,
          totalCount: posts.totalCount,
          nextCursor: posts.nextCursor,
          query: query
        };
      })
    );
  },
  togglePostRating: async postId => {
    const hasRated =
      get().communityPosts.featuredPosts.items.some(
        post => post.id === postId && post.hasRated
      ) ||
      get().communityPosts.latestPosts.items.some(
        post => post.id === postId && post.hasRated
      ) || get().communityPosts.searchPosts.items.some(
        post => post.id === postId && post.hasRated
      );

    set(
      produce((state: TStoreState) => {
        const featuredPost = state.communityPosts.featuredPosts.items.find(
          post => post.id === postId
        );
        if (featuredPost) {
          featuredPost.hasRated = !hasRated;
          featuredPost.stars += hasRated ? -1 : 1;
        }
        const latestPost = state.communityPosts.latestPosts.items.find(
          post => post.id === postId
        );
        if (latestPost) {
          latestPost.hasRated = !hasRated;
          latestPost.stars += hasRated ? -1 : 1;
        }

        const searchPosts = state.communityPosts.searchPosts.items.find(
          post => post.id === postId
        );
        if (searchPosts) {
          searchPosts.hasRated = !hasRated;
          searchPosts.stars += hasRated ? -1 : 1;
        }
      })
    );

    const [, error] = await sq.mutate(m => {
      if (hasRated) m.socialPostUnstar({ postId: postId });
      else m.socialPostStar({ postId: postId });
    });
    if (error) return false;

    await Promise.all([
      get().communityPosts.fetchFeaturedPosts(true),
      get().communityPosts.fetchLatestPosts(true)
    ]);
    return true;
  },
  togglePostPrivacy: async (id, privacy) => {
    const postIdx = [
      get().communityPosts.searchPosts.items.findIndex(p => p.id === id),
      get().communityPosts.featuredPosts.items.findIndex(p => p.id === id),
      get().communityPosts.latestPosts.items.findIndex(p => p.id === id)
    ];

    if (
      get().communityPosts.searchPosts.items[postIdx[0]]?.privacy === privacy ||
      get().communityPosts.featuredPosts.items[postIdx[1]]?.privacy ===
        privacy ||
      get().communityPosts.latestPosts.items[postIdx[2]]?.privacy === privacy
    )
      return true;

    const [, err] = await sq.mutate(m =>
      m.socialPostUpdate({
        postId: id,
        values: { privacy: asEnumKey(PrivacyInputInput, privacy) }
      })
    );

    if (err?.length === 0) return false;

    set(
      produce((state: TStoreState): void => {
        if (postIdx[0] !== -1)
          state.communityPosts.featuredPosts.items[postIdx[0]].privacy =
            privacy;
        if (postIdx[1] !== -1)
          state.communityPosts.latestPosts.items[postIdx[1]].privacy = privacy;
        if (postIdx[2] !== -1)
          state.communityPosts.latestPosts.items[postIdx[2]].privacy = privacy;
      })
    );

    get().communityPosts.fetchFeaturedPosts(true);
    get().communityPosts.fetchLatestPosts(true);
    if (get().communityPosts.searchPosts.state === 'success') {
      get().communityPosts.fetchSearchPosts(
        get().communityPosts.searchPosts.query,
        POST_FETCH_LIMIT,
        0,
        get().communityPosts.postLanguage,
        get().communityPosts.dateRange
      );
    }

    return true;
  },
  setPostLanguage: language => {
    set(
      produce((state: TStoreState) => {
        state.communityPosts.postLanguage = language;
      })
    );
  },
  setDateRange: (from, to) => {
    set(
      produce((state: TStoreState) => {
        // null is only used to reset the date
        // undefined is used to keep the current value
        // a date value is used to set the date
        if (from !== undefined)
          state.communityPosts.dateRange.from = from ?? undefined;
        if (to !== undefined)
          state.communityPosts.dateRange.to = to ?? undefined;

        state.communityPosts.searchPosts.nextCursor = undefined;
      })
    );

    const dateRange = {
      from: from ?? get().communityPosts.dateRange.from,
      to: to ?? get().communityPosts.dateRange.to
    };

    get().communityPosts.fetchSearchPosts(
      get().communityPosts.searchPosts.query,
      POST_FETCH_LIMIT,
      0,
      get().communityPosts.postLanguage,
      dateRange
    );
  },
  deletePost: async (id) => {
    const succeed = await deletePost(id);
    if (succeed) return false;
    set(
      produce((state: TStoreState) => {
        state.communityPosts.featuredPosts.items = state.communityPosts.featuredPosts.items.filter(p => p.id !== id);
        state.communityPosts.latestPosts.items = state.communityPosts.latestPosts.items.filter(p => p.id !== id);
        state.communityPosts.searchPosts.items = state.communityPosts.searchPosts.items.filter(p => p.id !== id);
      })
    );
    return true;
  },
});
