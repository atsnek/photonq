import { sq } from "@snek-functions/origin";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { TCommunityPostsSlice } from "../types/communityPostsState";
import { produce } from "immer";
import { buildPostPreview } from "../../../shared/utils/features/post";
import { asEnumKey } from "snek-query";
import { PrivacyInputInput } from "@snek-functions/origin/dist/schema.generated";


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

        const [rawPosts, rawError] = await sq.query(q => q.allSocialPostTrending({ filters: { limit: 4, offset: 0 } }));
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

        const [rawPosts, rawError] = await sq.query(q => q.allSocialPost({ filters: { limit: 4, offset: 0, privacy: asEnumKey(PrivacyInputInput, "public") } }));
        const [posts, buildError] = await sq.query(q => rawPosts?.map((p) => buildPostPreview(q, p, currentUser)));

        if (rawError || buildError) return;
        set(produce((state: TStoreState) => {
            state.communityPosts.latestPosts.state = 'success';
            state.communityPosts.latestPosts.posts = posts;
        }));
    },
    fetchSearchPosts: async (query: string) => {
        // fetch search posts
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
