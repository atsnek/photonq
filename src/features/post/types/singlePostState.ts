import { TUser } from "../../user/types/user";
import { TPost } from "./post";


export interface ISinglePostStateDefinition {
    post?: TPost;
    postAuthor?: TUser;
}

export interface ISinglePostStateActions {
    toggleRating: () => void;
    editTitle: (title: string) => void;
    editContent: (content: string) => void;
    editSummary: (summary: string) => void;
    fetchPost: (id: TPost['id']) => void;
    fetchPostAuthor: () => void;
}

export type TSinglePostSlice = ISinglePostStateDefinition & ISinglePostStateActions;