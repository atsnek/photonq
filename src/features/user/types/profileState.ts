import { TPostListData } from "../../post/types/post";
import { TActivitySection } from "../activity/types/activity";
import { TUser } from "./user";


export interface IProfileStateDefinition {
    profile?: TUser;
    overviewPosts: TPostListData;
    activity: TActivitySection[];
}

export interface IProfileStateActions {
    fetchProfile: (username: string, currentUserId?: string) => Promise<boolean>;
}

export type TProfileSlice = IProfileStateDefinition & IProfileStateActions;