import { ReactNode } from 'react';
import { TPostPreview } from '../../post/types/post';
import { TActivity, TActivitySection } from '../activity/types/activity';

/**
 * This represents a single user.
 */
export type TUser = {
  id: string;
  username: string; // This identifies the user and needs to be unique
  displayName: string; // This is the name visible to other users
  bio: string | null;
  avatarUrl?: string;
  // socials: TUserSocials[];
  stats?: TProfileStat;
  location?: string;
};

/**
 * This represents the profile of a user.
 */
export type TProfile = {
  user: TUser;
  activity: TActivitySection[];
  posts: TPostPreview[];
};

export type TProfileStatType = 'stars' | 'followers' | 'views' | 'posts';

export type TProfileStat = { [key in TProfileStatType]: number };

/**
 * This contains all the variants of social links that a user can have.
 */
//TODO: Maybe there is a better way to do this?
// export type TUserSocialType = 'email' | 'linkedin' | 'company';
// export type TUserLinklessSocialType = 'location';

// /**
//  * This represents a single social link of a user.
//  */
// export type TUserSocials =
//   | {
//     type: TUserSocialType;
//     label: string;
//     url: string;
//   }
//   | {
//     type: TUserLinklessSocialType;
//     label: string;
//   };
