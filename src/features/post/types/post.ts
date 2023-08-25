import { ReactNode } from 'react';
import { Optional } from '../../../shared/types/utilityTypes';
import { TUser } from '../../user/types/user';

/**
 * A single post
 */
export type TPost = {
  id: string;
  publicationDate: string;
  author: string;
  title: string;
  previewImage?: string;
  content: ReactNode;
  summary: string;
  likes: number;
  hasLiked: boolean;
  url: string;
  canManage: boolean;
};

/**
 * A single preview of a post
 */
export type TPostPreview = Omit<
  Optional<TPost, 'hasLiked' | 'canManage'>,
  'content'
>;

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