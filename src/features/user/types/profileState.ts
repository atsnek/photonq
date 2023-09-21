import { TPostListData, TPostPreview } from "../../post/types/post";
import { TActivity } from "../activity/types/activity";
import { TUser } from "./user";


export interface IProfileStateDefinition {
    profile?: TUser;
    overviewPosts: TPostListData;
    searchPosts: TPostListData;
    activity: TActivity[];
    followers: number;
    isFollowing?: boolean;
}

export interface IProfileStateActions {
    fetchProfile: (username: string, currentUserId?: string) => Promise<boolean>;
    fetchOverviewPosts: () => Promise<boolean>;
    fetchActivity: () => Promise<boolean>;
    fetchSearchPosts: (query: string, limit: number, offset: number) => Promise<void>;
    toggleFollow: () => Promise<boolean>;
    changeBio: (bio: string) => Promise<boolean>;
    togglePostRating: (id: TPostPreview['id'], source: 'overview' | 'search') => Promise<boolean>;
}

export type TProfileSlice = IProfileStateDefinition & IProfileStateActions;