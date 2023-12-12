import { TPostPreview } from '../../post/types/post';
import { TActivitySection } from '../activity/types/activity';

/**
 * This represents a single user.
 */
export type TUser = {
  id: string;
  username: string; // This identifies the user and needs to be unique
  displayName: string; // This is the name visible to other users
  bio: string | null;
  avatarUrl?: string;
  stats?: TProfileStat;
  location?: string;
  isFollowing?: boolean;
  isOwnProfile?: boolean;
};

/**
 * This represents the profile of a user.
 */
export type TProfile = {
  user: TUser;
  activity: TActivitySection[];
  posts: TPostPreview[];
};

/**
 * All the possible tabs in the profile page.
 */
export type TProfileTab =
  | 'overview'
  | 'experiments'
  | 'stars'
  | 'followers'
  | 'following';

/**
 * This represents a single stat of a user.
 */
export type TProfileStatType =
  | 'following'
  | 'followers'
  | 'views'
  | 'experiments'
  | 'starred';

export type TProfilePostLists = 'all-experiments' | 'starred-experiments';

/**
 * This represents all the stats of a user.
 */
export type TProfileStat = { [key in TProfileStatType]: number };
