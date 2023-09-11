import { StateCreator } from "zustand";
import { TPostSlice } from "../../features/post/types/postState";
import { TUserSlice } from "../../features/user/types/userState";
import { TProfileSlice } from "../../features/user/types/profileState";

export interface TStoreState {
    singlePost: TPostSlice,
    profile: TProfileSlice,
    currentUser: TUserSlice,
}

export type TStoreSlice<T> = StateCreator<TStoreState, [["zustand/devtools", never]], [], T>;