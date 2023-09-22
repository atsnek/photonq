import { sq } from "@snek-functions/origin";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { TCommunityPostsSlice } from "../types/communityPostsState";
import { produce } from "immer";
import { buildPostPreview, searchPosts } from "../../../shared/utils/features/post";
import { asEnumKey } from "snek-query";
import { PrivacyInputInput } from "@snek-functions/origin/dist/schema.generated";
import { TPost, TPostPreview } from "../types/post";


export const createCommunityPostsSlice: TStoreSlice<TCommunityPostsSlice> = (set, get) => ({
    featuredPosts: { state: 'loading', items: [], totalCount: 0 },
    latestPosts: { state: 'loading', items: [], totalCount: 0 },
    searchPosts: { state: 'inactive', items: [], totalCount: 0, query: '' },
    fetchFeaturedPosts: async (silent) => {
        if (!silent) {
            set(produce((state: TStoreState) => {
                state.communityPosts.featuredPosts.state = 'loading';
            }))
        }

        const [currentUser,] = await sq.query(q => q.userMe);

        const [rawPosts, rawError] = await sq.query(q => {
            const postComm = q.allSocialPostTrending({ first: 4 });
            //! Existing issue: see post utils -> buildPostPreview
            postComm?.nodes.forEach(pn => {
                try {
                    pn.stars().edges.map(se => se.node.profile.id);
                    pn.stars().totalCount;
                    for (const key in pn) {
                        pn[key as keyof typeof pn];
                    }
                } catch { }
            })
            return postComm?.nodes ?? [];
        });
        // const [posts, buildError] = await sq.query(q => rawPosts?.map((p) => buildPostPreview(q, p, currentUser)));
        const posts = await Promise.all((rawPosts?.map(async (p) => {
            if (!p) return;
            return (await sq.query(q => buildPostPreview(q, p, currentUser)))[0];
        }) ?? []).filter(p => !!p)) as TPostPreview[];

        if (rawError) return;
        set(produce((state: TStoreState) => {
            state.communityPosts.featuredPosts = {
                state: 'success',
                items: posts,
                totalCount: posts.length
            };
        }))
    },
    fetchLatestPosts: async (silent) => {
        const FETCH_LIMIT = 10;
        if (!silent) {
            set(produce((state: TStoreState) => {
                state.communityPosts.latestPosts.state = 'loading';
            }));
        }

        const [currentUser,] = await sq.query(q => q.userMe);

        const [postConnection, rawError] = await sq.query(q => {
            const postComm = q.allSocialPost({ first: FETCH_LIMIT, after: get().communityPosts.latestPosts.nextCursor, filters: { privacy: asEnumKey(PrivacyInputInput, "PUBLIC") } })
            //! Existing issue: see post utils -> buildPostPreview
            postComm?.pageInfo.endCursor;
            postComm?.pageInfo.hasNextPage;
            postComm?.pageInfo.hasPreviousPage;
            postComm?.pageInfo.startCursor;
            postComm?.nodes.forEach(pn => {
                try {
                    pn.stars().edges.map(se => se.node.profile.id);
                    pn.stars().totalCount;
                    for (const key in pn) {
                        pn[key as keyof typeof pn];
                    }
                } catch { }
            })
            return postComm;
        });
        const posts = await Promise.all((postConnection?.nodes?.map(async (p) => {
            if (!p) return;
            return (await sq.query(q => buildPostPreview(q, p, currentUser)))[0];
        }) ?? []).filter(p => !!p)) as TPostPreview[];

        if (rawError) return;
        set(produce((state: TStoreState) => {
            state.communityPosts.latestPosts = {
                state: 'success',
                items: postConnection?.pageInfo.hasPreviousPage ? [...state.communityPosts.latestPosts.items, ...posts] : posts,
                itemsPerPage: FETCH_LIMIT,
                totalCount: posts.length,
                nextCursor: postConnection?.pageInfo?.hasNextPage && postConnection.pageInfo.endCursor ? postConnection?.pageInfo.endCursor : undefined,
                prevCursor: postConnection?.pageInfo?.hasPreviousPage && postConnection.pageInfo.startCursor ? postConnection?.pageInfo.startCursor : undefined,
                hasMore: postConnection?.pageInfo?.hasNextPage ?? false
            };
        }));
    },
    fetchSearchPosts: async (query, limit, offset) => {
        if (!query.length) {
            set(produce((state: TStoreState) => {
                state.communityPosts.searchPosts = { state: "inactive", items: [], totalCount: 0, query: query };
            }));
            return;
        }

        set(produce((state: TStoreState) => {
            if (query !== state.communityPosts.searchPosts.query) {
                // Reset the state if the query changed
                state.communityPosts.searchPosts = {
                    query,
                    state: "loading",
                    items: [],
                    hasMore: false,
                    totalCount: 0,
                };
            } else {
                state.communityPosts.searchPosts.state = "loading";
            }
        }))

        const [currentUser,] = await sq.query(q => q.userMe);

        const posts = await searchPosts(query, limit, 'PUBLIC', get().communityPosts.searchPosts.nextCursor, currentUser);

        set(produce((state: TStoreState) => {
            state.communityPosts.searchPosts = {
                state: 'success',
                items: offset === 0
                    ? posts.items
                    : [...state.communityPosts.searchPosts.items, ...posts.items],
                hasMore: posts.hasMore,
                totalCount: posts.totalCount,
                query: query
            };
        }));

    },
    togglePostRating: async (postId) => {

        const hasRated = get().communityPosts.featuredPosts.items.some(post => post.id === postId && post.hasRated) || get().communityPosts.latestPosts.items.some(post => post.id === postId && post.hasRated);

        set(produce((state: TStoreState) => {
            const featuredPost = state.communityPosts.featuredPosts.items.find(post => post.id === postId);
            if (featuredPost) featuredPost.hasRated = !hasRated;
            const latestPost = state.communityPosts.latestPosts.items.find(post => post.id === postId);
            if (latestPost) latestPost.hasRated = !hasRated;
        }))

        const [, error] = await sq.mutate(m => {
            if (hasRated) m.socialPostUnstar({ postId: postId });
            else m.socialPostStar({ postId: postId });
        });
        if (error) return false;

        await Promise.all([get().communityPosts.fetchFeaturedPosts(true), get().communityPosts.fetchLatestPosts(true)]);
        return true;
    },
});
