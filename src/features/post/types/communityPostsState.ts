import { TPostListData, TPostPreview } from "./post";


export interface ICommunityPostsStateDefinitions {
    featuredPosts: TPostListData;
    latestPosts: TPostListData;
    searchPosts: TPostListData;
}

export interface ICommunityPostsStateActions {
    fetchFeaturedPosts: () => void;
    fetchLatestPosts: () => void;
    fetchSearchPosts: (query: string) => void;
}

export type TCommunityPostsSlice = ICommunityPostsStateDefinitions & ICommunityPostsStateActions;