import { sq } from "@snek-functions/origin";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { TCommunityPostsSlice } from "../types/communityPostsState";
import { produce } from "immer";
import { buildPostPreview, searchPosts } from "../../../shared/utils/features/post";
import { asEnumKey } from "snek-query";
import { PrivacyInputInput } from "@snek-functions/origin/dist/schema.generated";
import { TPostPreview } from "../types/post";


export const createCommunityPostsSlice: TStoreSlice<TCommunityPostsSlice> = (set, get) => ({
    featuredPosts: { state: 'loading', posts: [] },
    latestPosts: { state: 'loading', posts: [] },
    searchPosts: { state: 'inactive', posts: [] },
    fetchFeaturedPosts: async (silent) => {
        if (!silent) {
            set(produce((state: TStoreState) => {
                state.communityPosts.featuredPosts.state = 'loading';
            }))
        }

        const [currentUser,] = await sq.query(q => q.userMe);

        const [rawPosts, rawError] = await sq.query(q => {
            const posts = q.allSocialPostTrending({ filters: { limit: 4, offset: 0 } });
            //! Existing issue: see post utils -> buildPostPreview
            if (posts?.length > 0 && posts[0] !== null) {
                for (const key in posts[0]) {
                    posts[0][key as keyof typeof posts[0]];
                }
            }
            return posts;
        });
        const [posts, buildError] = await sq.query(q => rawPosts?.map((p) => buildPostPreview(q, p, currentUser)));

        if (rawError || buildError) return;
        set(produce((state: TStoreState) => {
            state.communityPosts.featuredPosts.state = 'success';
            state.communityPosts.featuredPosts.posts = posts;
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
            const posts = q.allSocialPost({ filters: { limit: 4, offset: 0, privacy: asEnumKey(PrivacyInputInput, "PUBLIC") } })
            //! Existing issue: see post utils -> buildPostPreview
            const checkedKeys: string[] = [];
            posts?.map(p => {
                p?.id
            })
            for (const post of posts ?? []) {
                for (const key in post) {
                    if (checkedKeys.includes(key)) continue;
                    post[key as keyof typeof posts[0]];
                    checkedKeys.push(key);
                }
                for (const star of post?.stars() ?? []) {
                    for (const key in star) {
                        star[key as keyof typeof star];
                    }
                }
            }
            return posts;
        });
        const posts = await Promise.all(rawPosts?.map(async (p) => {
            if (!p) return;
            return (await sq.query(q => buildPostPreview(q, p, currentUser)))[0];
        }));
        // const [posts, buildError] = await sq.query(q => rawPosts?.map((p) => buildPostPreview(q, p, currentUser)));

        if (rawError) return;
        set(produce((state: TStoreState) => {
            state.communityPosts.latestPosts.state = 'success';
            state.communityPosts.latestPosts.posts = posts.filter(p => !!p) as TPostPreview[];
        }));
    },
    fetchSearchPosts: async (query, limit, offset) => {
        if (!query.length) {
            set(produce((state: TStoreState) => {
                state.communityPosts.searchPosts = { state: "inactive", posts: [] };
            }));
            return;
        }

        set(produce((state: TStoreState) => {
            state.communityPosts.searchPosts.state = 'loading';
        }));

        const [currentUser,] = await sq.query(q => q.userMe);

        const posts = await searchPosts(query, limit, offset, 'PUBLIC', currentUser);

        set(produce((state: TStoreState) => {
            state.communityPosts.searchPosts = {
                state: 'success',
                posts: offset === 0
                    ? posts.posts
                    : [...state.communityPosts.searchPosts.posts, ...posts.posts],
                hasMore: posts.hasMore
            };
        }));

    },
    togglePostRating: async (postId) => {

        const hasRated = get().communityPosts.featuredPosts.posts.some(post => post.id === postId && post.hasRated) || get().communityPosts.latestPosts.posts.some(post => post.id === postId && post.hasRated);

        set(produce((state: TStoreState) => {
            const featuredPost = state.communityPosts.featuredPosts.posts.find(post => post.id === postId);
            if (featuredPost) featuredPost.hasRated = !hasRated;
            const latestPost = state.communityPosts.latestPosts.posts.find(post => post.id === postId);
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
