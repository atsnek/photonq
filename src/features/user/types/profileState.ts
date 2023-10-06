import { TPaginationData } from '../../../shared/types/pagination';
import {
  EnPostLanguage,
  TPaginatedPostListData,
  TPostDateRange,
  TPostPreview,
  TSearchPostListData
} from '../../post/types/post';
import { TActivity } from '../activity/types/activity';
import { TUser } from './user';

export interface IProfileStateDefinition {
  profile?: TUser;
  overviewPosts: TPaginatedPostListData;
  searchPosts: TSearchPostListData;
  searchPostLanguage: EnPostLanguage | undefined;
  searchPostsDateRange: TPostDateRange;
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
  setSearchPostLanguage: (language?: EnPostLanguage) => void;
  setSearchPostsDateRange: (
    from: Date | null | undefined,
    to: Date | null | undefined
  ) => void;
  toggleFollow: () => Promise<boolean>;
  changeBio: (bio: string) => Promise<boolean>;
  togglePostRating: (
    id: TPostPreview['id'],
    source: 'overview' | 'search'
  ) => Promise<boolean>;
  togglePostPrivacy: (
    id: TPostPreview['id'],
    privacy: TPostPreview['privacy']
  ) => Promise<boolean>;
  reset: () => void;
}

export type TProfileSlice = IProfileStateDefinition & IProfileStateActions;
