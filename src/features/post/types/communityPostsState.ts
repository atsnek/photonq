import { EnPostLanguage, TPaginatedPostListData, TPostDateRange, TPostPreview, TSearchPostListData } from "./post";


export interface ICommunityPostsStateDefinitions {
    featuredPosts: TPaginatedPostListData;
    latestPosts: TPaginatedPostListData;
    searchPosts: TSearchPostListData;
    postLanguage: EnPostLanguage | undefined;
    dateRange: TPostDateRange;
}

export interface ICommunityPostsStateActions {
    fetchFeaturedPosts: (silen?: boolean) => void;
    fetchLatestPosts: (silent?: boolean) => void;
    fetchSearchPosts: (query: string, limit: number, offset: number, language?: EnPostLanguage, dateRange?: TPostDateRange) => void;
    togglePostRating: (id: TPostPreview['id']) => Promise<boolean>;
    setPostLanguage: (language?: EnPostLanguage) => void;
    setDateRange: (from: Date | null | undefined, to: Date | null | undefined) => void;
}

export type TCommunityPostsSlice = ICommunityPostsStateDefinitions & ICommunityPostsStateActions;