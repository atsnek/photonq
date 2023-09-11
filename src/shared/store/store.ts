import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createProfileSlice } from "../../features/user/store/profileSlice";
import { createUserSlice } from "../../features/user/store/userSlice";
import { TStoreState } from "../types/store";
import { createPostSlice } from "../../features/post/store/postSlice";

/**
 * App store for global state management
 * @returns {Object} App store
 */
export const useAppStore = create<TStoreState>()(
    devtools((...a) => ({
        singlePost: createPostSlice(...a),
        profile: createProfileSlice(...a),
        currentUser: createUserSlice(...a),
    })));