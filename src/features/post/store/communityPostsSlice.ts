import { sq } from "@snek-functions/origin";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { TCommunityPostsSlice } from "../types/communityPostsState";
import { produce } from "immer";
import { buildPostPreview, searchPosts } from "../../../shared/utils/features/post";
import { asEnumKey } from "snek-query";
import { PrivacyInputInput } from "@snek-functions/origin/dist/schema.generated";
import { TPostPreview } from "../types/post";


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
        const [posts, buildError] = await sq.query(q => rawPosts?.map((p) => buildPostPreview(q, p, currentUser)));

        if (rawError || buildError) return;
        set(produce((state: TStoreState) => {
            state.communityPosts.featuredPosts = {
                state: 'success',
                items: posts,
                totalCount: posts.length
            };
        }))
    },
    fetchLatestPosts: async (silent) => {
        if (!silent) {
            set(produce((state: TStoreState) => {
                state.communityPosts.latestPosts.state = 'loading';
            }));
        }

        const [currentUser,] = await sq.query(q => q.userMe);

        const [rawPosts, rawError] = await sq.query(q => {
            const postComm = q.allSocialPost({ first: 10, filters: { privacy: asEnumKey(PrivacyInputInput, "PUBLIC") } })
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
        const posts = await Promise.all(rawPosts?.map(async (p) => {
            if (!p) return;
            return (await sq.query(q => buildPostPreview(q, p, currentUser)))[0];
        }));
        // const [posts, buildError] = await sq.query(q => rawPosts?.map((p) => buildPostPreview(q, p, currentUser)));

        if (rawError) return;
        set(produce((state: TStoreState) => {
            state.communityPosts.latestPosts = {
                state: 'success',
                items: posts.filter(p => !!p) as TPostPreview[],
                totalCount: posts.length
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
            if (query !== state.profile.searchPosts.query) {
                // Reset the state if the query changed
                state.profile.searchPosts = {
                    query,
                    state: "loading",
                    items: [],
                    hasMore: false,
                    totalCount: 0,
                };
            } else {
                state.profile.searchPosts.state = "loading";
            }
        }))

        const [currentUser,] = await sq.query(q => q.userMe);

        const posts = await searchPosts(query, limit, 'PUBLIC', get().communityPosts.searchPosts.cursor, currentUser);

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
