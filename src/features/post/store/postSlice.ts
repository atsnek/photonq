import { StateCreator } from "zustand";
import { TPost } from "../types/post"
import { fetchPost } from "../../../shared/utils/features/post";
import { TUser } from "../../user/types/user";
import { TStoreSlices, useAppStore } from "../../../shared/store/store";
import { fetchProfile } from "../../user/utils/user";
import { produce } from "immer";
import { ProfileSlice } from "../../user/store/profileSlice";
import { UserSlice } from "../../user/store/userSlice";

export interface PostSlice {
    post?: TPost;
    postAuthor?: TUser;
    toggleRating: () => void;
    editTitle: (title: string) => void;
    editContent: (content: string) => void;
    editSummary: (summary: string) => void;
    fetchPost: (id: TPost['id']) => void;
    fetchPostAuthor: () => void;
}

export const createPostSlice: StateCreator<TStoreSlices, [["zustand/devtools", never]], [], PostSlice> = (set) => ({
    editContent: (content) => {
        set(produce((state: PostSlice) => {
            if (!state.post) return;
            state.post.content = content;
        }))
    },
    editSummary: (summary) => {
        set(produce((state: PostSlice) => {
            if (!state.post) return;
            state.post.summary = summary;
        }))
    },
    editTitle: (title) => {
        set(produce((state: PostSlice) => {
            if (!state.post) return;
            state.post.title = title;
        }))
    },
    toggleRating: () => {
        set(produce((state: PostSlice) => {
            //TODO: Implement this sometime
            // state.post.stars = false;
        }))
    },
    fetchPost: async (id) => {
        const post = await fetchPost(id);
        set(produce((state: PostSlice) => {
            state.post = post;
            // return state;
        }))
    },
    fetchPostAuthor: async () => {
        const authorId = useAppStore.getState().post?.authorProfileId;
        if (!authorId) {
            console.log("postslice: no author id found");
            return;
        }

        const author = await fetchProfile(authorId);
        set(produce((state: PostSlice) => {
            state.postAuthor = author;
        }))
    },
})