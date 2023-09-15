import { sq } from "@snek-functions/origin";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { TCommunityPostsSlice } from "../types/communityPostsState";
import { produce } from "immer";
import { buildPostPreview } from "../../../shared/utils/features/post";
import { useAppStore } from "../../../shared/store/store";


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
        const [posts, error] = await sq.query(q => {
            const posts = q.allSocialPostTrending({ filters: { limit: 4, offset: 0 } })
            return posts?.filter(p => p !== null).map((p) => buildPostPreview(q, p, q.userMe));
        });
        if (error) return;
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

        const [posts, error] = await sq.query(q => {
            const posts = q.allSocialPost({ filters: { limit: 4, offset: 0 } })

            return posts?.filter(p => p !== null).map((p) => buildPostPreview(q, p, q.userMe));
        });

        if (error) return;

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
