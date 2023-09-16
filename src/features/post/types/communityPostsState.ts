import { TPostListData, TPostPreview } from "./post";


export interface ICommunityPostsStateDefinitions {
    featuredPosts: TPostListData;
    latestPosts: TPostListData;
    searchPosts: TPostListData;
}

export interface ICommunityPostsStateActions {
    fetchFeaturedPosts: (silent?: boolean) => void;
    fetchLatestPosts: (silent?: boolean) => void;
    fetchSearchPosts: (query: string, limit: number, offset: number) => void;
    togglePostRating: (id: TPostPreview['id']) => Promise<boolean>;
}

export type TCommunityPostsSlice = ICommunityPostsStateDefinitions & ICommunityPostsStateActions;