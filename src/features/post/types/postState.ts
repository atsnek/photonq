import { TUser } from "../../user/types/user";
import { TPost } from "./post";


export interface IPostStateDefinition {
    post?: TPost;
    postAuthor?: TUser;
}

export interface IPostStateActions {
    toggleRating: () => void;
    editTitle: (title: string) => void;
    editContent: (content: string) => void;
    editSummary: (summary: string) => void;
    fetchPost: (id: TPost['id']) => void;
    fetchPostAuthor: () => void;
}

export type TPostSlice = IPostStateDefinition & IPostStateActions;