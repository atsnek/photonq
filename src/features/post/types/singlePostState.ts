import { SnekUser } from '@atsnek/jaen';
import { TPost, EnPostLanguage } from './post';
import { TUser } from '../../user/types/user';
import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';

export interface ISinglePostStateDefinition {
  isNewPost: boolean;
  post?: TPost;
  postAuthor: TUser | null;
  madeChanges: {
    title: boolean;
    avatarUrl: boolean;
    summary: boolean;
    content: boolean;
    language: boolean;
    privacy: boolean;
  },
  newAvatarUrlFile?: File;
}

export interface ISinglePostStateActions {
  createEmptyPost: () => void;
  editTitle: (title: string) => Promise<boolean>;
  editContent: (content: MdastRoot) => Promise<boolean>;
  editSummary: (summary: string) => Promise<boolean>;
  fetchPost: (slug: string) => Promise<boolean>;
  createNewPost: (previewImage?: File) => Promise<string | undefined>;
  savePost: () => Promise<boolean>;
  togglePostRating: () => Promise<boolean>;
  updatePreviewImage: (src: File) => Promise<boolean>;
  togglePrivacy: () => Promise<boolean>;
  changeLanguage: (language: EnPostLanguage) => Promise<boolean>;
  reset: () => void;
  deletePost: () => Promise<boolean>;
}

export type TSinglePostSlice = ISinglePostStateDefinition &
  ISinglePostStateActions;
