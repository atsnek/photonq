import { SnekUser } from "@atsnek/jaen";
import { TPost } from "./post";
import { TUser } from "../../user/types/user";


export interface ISinglePostStateDefinition {
    post?: TPost;
    postAuthor: TUser | null;
}

export interface ISinglePostStateActions {
    toggleRating: () => void;
    editTitle: (title: string) => Promise<boolean>;
    editContent: (content: string) => Promise<boolean>;
    editSummary: (summary: string) => Promise<boolean>;
    fetchPost: (slug: string) => Promise<boolean>;
    togglePostRating: () => Promise<boolean>;
    updatePreviewImage: (src: File) => void;
    togglePrivacy: () => Promise<boolean>;
}

export type TSinglePostSlice = ISinglePostStateDefinition & ISinglePostStateActions;