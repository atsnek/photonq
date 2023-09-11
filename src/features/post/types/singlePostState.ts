import { SnekUser } from "@atsnek/jaen";
import { TPost } from "./post";
import { TUser } from "../../user/types/user";


export interface ISinglePostStateDefinition {
    post?: TPost;
    postAuthor: TUser | null;
}

export interface ISinglePostStateActions {
    toggleRating: () => void;
    editTitle: (title: string) => void;
    editContent: (content: string) => void;
    editSummary: (summary: string) => void;
    fetchPost: (slug: string) => void;
    fetchPostAuthor: () => void;
}

export type TSinglePostSlice = ISinglePostStateDefinition & ISinglePostStateActions;