import { SnekUser } from "@atsnek/jaen";
import { TPost, EnPostLanguage } from "./post";
import { TUser } from "../../user/types/user";


export interface ISinglePostStateDefinition {
    post?: TPost;
    postAuthor: TUser | null;
}

export interface ISinglePostStateActions {
    editTitle: (title: string) => Promise<boolean>;
    editContent: (content: string) => Promise<boolean>;
    editSummary: (summary: string) => Promise<boolean>;
    fetchPost: (slug: string) => Promise<boolean>;
    togglePostRating: () => Promise<boolean>;
    updatePreviewImage: (src: File) => Promise<boolean>;
    togglePrivacy: () => Promise<boolean>;
    changeLanguage: (language: EnPostLanguage) => Promise<boolean>;
}

export type TSinglePostSlice = ISinglePostStateDefinition & ISinglePostStateActions;