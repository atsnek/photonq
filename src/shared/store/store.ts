import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PostSlice, createPostSlice } from "../../features/post/store/postSlice";

/**
 * App store for global state management
 * @returns {Object} App store
 */
// export const useAppStore = create<PostSlice>()((...a) => ({
//     ...createPostSlice(...a)
// }));
export const useAppStore = create<PostSlice>()(
    devtools((...a) => ({
        ...createPostSlice(...a)
    })));