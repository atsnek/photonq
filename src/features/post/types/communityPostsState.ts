import { TPaginatedPostListData, TPostPreview, TSearchPostListData } from "./post";


export interface ICommunityPostsStateDefinitions {
    featuredPosts: TPaginatedPostListData;
    latestPosts: TPaginatedPostListData;
    searchPosts: TSearchPostListData;
}

export interface ICommunityPostsStateActions {
    fetchFeaturedPosts: (silent?: boolean) => void;
    fetchLatestPosts: (silent?: boolean) => void;
    fetchSearchPosts: (query: string, limit: number, offset: number) => void;
    togglePostRating: (id: TPostPreview['id']) => Promise<boolean>;
}

export type TCommunityPostsSlice = ICommunityPostsStateDefinitions & ICommunityPostsStateActions;