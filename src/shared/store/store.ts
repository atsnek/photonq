import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PostSlice, createPostSlice } from "../../features/post/store/postSlice";
import { ProfileSlice, createProfileSlice } from "../../features/user/store/profileSlice";
import { UserSlice, createUserSlice } from "../../features/user/store/userSlice";

export type TStoreSlices = PostSlice & ProfileSlice & UserSlice;
/**
 * App store for global state management
 * @returns {Object} App store
 */
// export const useAppStore = create<PostSlice>()((...a) => ({
//     ...createPostSlice(...a)
// }));
export const useAppStore = create<TStoreSlices>()(
    devtools((...a) => ({
        ...createPostSlice(...a),
        ...createProfileSlice(...a),
        ...createUserSlice(...a),
    })));