import { sq } from "@snek-functions/origin";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { TCommunityPostsSlice } from "../types/communityPostsState";
import { produce } from "immer";
import { buildPostPreview } from "../../../shared/utils/features/post";
import { useAppStore } from "../../../shared/store/store";


export const createCommunityPostsSlice: TStoreSlice<TCommunityPostsSlice> = (set) => ({
    featuredPosts: { state: 'loading', posts: [] },
    latestPosts: { state: 'loading', posts: [] },
    searchPosts: { state: 'inactive', posts: [] },
    fetchFeaturedPosts: async () => {
        set(produce((state: TStoreState) => {
            state.communityPosts.featuredPosts.state = 'loading';
        }))
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
    fetchLatestPosts: async () => {
        set(produce((state: TStoreState) => {
            state.communityPosts.latestPosts.state = 'loading';
        }));

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
});
