import { TPaginationData } from '../../../shared/types/pagination';
import {
  EnPostLanguage,
  TPaginatedPostListData,
  TPostDateRange,
  TPostPreview,
  TSearchPostListData
} from '../../post/types/post';
import { TActivity } from '../activity/types/activity';
import { TProfilePostLists, TProfileTab, TUser } from './user';

export interface IProfileStateDefinition {
  profile?: TUser;
  overviewPosts: TPaginatedPostListData;
  searchPosts: TSearchPostListData;
  starredPosts: TSearchPostListData;
  followers: TPaginationData<TUser[]>;
  followingUsers: TPaginationData<TUser[]>;
  activity: TPaginationData<TActivity[]>;
  isFollowing?: boolean;
}

export interface IProfileStateActions {
  fetchProfile: (username: string, currentUserId?: string) => Promise<boolean>;
  fetchOverviewPosts: () => Promise<boolean>;
  fetchActivity: () => Promise<boolean>;
  fetchSearchPosts: (
    query: string,
    limit: number,
    offset: number,
    language?: EnPostLanguage,
    dateRange?: TPostDateRange
  ) => Promise<void>;
  setPostListLanguage: (postList?: TProfilePostLists, language?: EnPostLanguage) => void;
  setPostListDateRange: (
    from: Date | null | undefined,
    to: Date | null | undefined,
    postList?: TProfilePostLists,
  ) => void;
  fetchStarredPosts: (query: string, limit: number, offset: number, language?: EnPostLanguage, dateRange?: TPostDateRange) => Promise<boolean>;
  fetchFollowers: () => Promise<boolean>;
  fetchFollowingUsers: () => Promise<boolean>;
  toggleFollow: (id?: string) => Promise<boolean>;
  changeBio: (bio: string) => Promise<boolean>;
  togglePostRating: (
    id: TPostPreview['id'],
    source: Extract<TProfileTab, 'posts' | 'overview' | 'stars'>,
  ) => Promise<boolean>;
  togglePostPrivacy: (
    id: TPostPreview['id'],
    privacy: TPostPreview['privacy']
  ) => Promise<boolean>;
  reset: () => void;
}

export type TProfileSlice = IProfileStateDefinition & IProfileStateActions;
