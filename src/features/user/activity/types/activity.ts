import { TLinkData } from '../../../../shared/types/navigation';

// export type TActivityType = 'published' | 'commented' | 'rated';

export type TActivitySection = {
  timestamp: string;
  activities: TActivity[];
};

// export type TActivity = {
//   id: string;
//   title: Omit<TLinkData, 'isActive'>;
//   timestamp: string;
//   type: TActivityType;
// };

export type TActivity = {
  type: TActivityType;
  timestamp: string;
  title: Omit<TLinkData, 'isActive'>;
};

export type TActivityType =
  | 'blog_create'
  | 'blog_publish'
  | 'follow_follow'
  | 'profile_create'
  | 'star_unstar'
  | 'star_star';
