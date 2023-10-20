import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';
import {
  TPaginationData,
  TPaginationPageInfo
} from '../../../shared/types/pagination';
import { TUser } from '../../user/types/user';
import { Language } from '@snek-functions/origin/dist/schema.generated';
import { TAsyncListData } from '../../../shared/types/list';

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
export type TPostPrivacy = 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
export type TPostDateRange = { from: Date | undefined; to: Date | undefined };

export { Language as EnPostLanguage };

//TODO: This type needs to be improved to better fit the needs of the current system
export type TPost = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content?: MdastRoot;
  stars: number;
  hasRated?: boolean;
  avatarUrl: string | null;
  createdAt: string;
  canManage?: boolean;
  privacy: TPostPrivacy;
  authorProfileId: string | null;
  language: Language;
};

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
  language: Language;
  stars: number;
  hasRated: boolean;
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
};

/**
 * Metadata for fetching posts
 */
export type TPostListData = TAsyncListData<TPostPreview>

export type TPaginatedPostListData = TPaginationData<
  TPostPreview[],
  TPostListData
>;

/**
 * Extended post list data for search results
 */
export type TSearchPostListData = TPaginatedPostListData & {
  query: string;
  language?: Language;
  dateRange?: TPostDateRange;
  publicPageInfo?: Partial<TPaginationPageInfo>;
  privatePageInfo?: Partial<TPaginationPageInfo>;
};

/**
 * Props for a single post preview components (for all variants)
 */
export interface IPostPreviewProps<T> {
  post: TPostPreview;
  toggleRating: (id: TPostPreview['id']) => void;
  wrapperProps?: T;
  hideAuthor?: boolean;
  showPrivacy?: boolean;
  togglePostPrivacy: (id: string, privacy: TPostPreview['privacy']) => void;
  isTogglingPostPrivacy: boolean;
  deletePost?: (id: TPostPreview['id']) => void;
  isDeletingPost?: boolean;
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
};

/**
 * Represents a comment on a post review by a reviewer
 */
export type TPostReviewComment = {
  author: TUser;
  datetime: string;
  comment: string;
  textReference?: string; // This is the commented text
};
