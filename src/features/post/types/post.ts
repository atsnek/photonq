import { TUser } from '../../user/types/user';

/**
 * A single post
 */
// export type TPost = {
//   id: string;
//   publicationDate: string;
//   author: string;
//   title: string;
//   previewImage?: string;
//   content: ReactNode;
//   summary: string;
//   likes: number;
//   hasLiked: boolean;
//   url: string;
//   canManage: boolean;
// };

export type TPostViewMode = 'read' | 'edit';
export type TPostPrivacy = 'public' | 'private' | 'friends';

//TODO: This type needs to be improved to better fit the needs of the current system
export type TPost = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content?: string | null;
  stars: number;
  hasRated?: boolean;
  avatarUrl: string | null;
  createdAt: string;
  canManage?: boolean;
  privacy: TPostPrivacy,
  authorProfileId: string | null;
}

/**
 * A single preview of a post
 */
// export type TPostPreview = Omit<
//   Optional<TPost, 'hasLiked' | 'canManage'>,
//   'content'
// >;
//TODO: Replace profile with user once the backend is ready
export type TPostPreview = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  stars: number;
  avatarUrl: string | null;
  createdAt: string;
  canManage?: boolean;
  privacy: TPostPrivacy;
  profile: TPostAuthor;
};

export type TPostAuthor = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string | null;
}

/**TSearchMetaData
 * Metadata for fetching posts
 */
export type TPostListData = {
  posts: TPostPreview[];
  state: 'inactive' | 'loading' | 'error' | 'success';
};

/**
 * Props for a single post preview components (for all variants)
 */
export interface IPostPreviewProps<T> extends TPostPreview {
  toggleLike: (id: TPostPreview['id']) => void;
  canManage?: boolean;
  wrapperProps?: T;
  hideAuthor?: boolean;
  showPrivacy?: boolean;
}

export type TPostReviewStatus = 'pending' | 'approved' | 'rejected';

/**
 * Represents a review of a post
 */
export type TPostReview = {
  post: TPost;
  datetime: string;
  title: string;
  reviewers: TUser[];
  status: TPostReviewStatus;
  comments: TPostReviewComment[];
}

/**
 * Represents a comment on a post review by a reviewer
 */
export type TPostReviewComment = {
  author: TUser;
  datetime: string;
  comment: string;
  textReference?: string; // This is the commented text
}