import { EnPostLanguage, TPaginatedPostListData, TPostPreview, TSearchPostListData } from "./post";


export interface ICommunityPostsStateDefinitions {
    featuredPosts: TPaginatedPostListData;
    latestPosts: TPaginatedPostListData;
    searchPosts: TSearchPostListData;
    postLanguage: EnPostLanguage | undefined;
}

export interface ICommunityPostsStateActions {
    fetchFeaturedPosts: (silen?: boolean) => void;
    fetchLatestPosts: (silent?: boolean) => void;
    fetchSearchPosts: (query: string, limit: number, offset: number, language?: EnPostLanguage) => void;
    togglePostRating: (id: TPostPreview['id']) => Promise<boolean>;
    setPostLanguage: (language?: EnPostLanguage) => void;
}

export type TCommunityPostsSlice = ICommunityPostsStateDefinitions & ICommunityPostsStateActions;