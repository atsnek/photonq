import { fetchPost } from "../../../shared/utils/features/post";
import { useAppStore } from "../../../shared/store/store";
import { fetchProfile } from "../../user/utils/user";
import { produce } from "immer";
import { TSinglePostSlice } from "../types/singlePostState";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";

export const createSinglePostSlice: TStoreSlice<TSinglePostSlice> = (set) => ({
    editContent: (content) => {
        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.content = content;
        }))
    },
    editSummary: (summary) => {
        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.summary = summary;
        }))
    },
    editTitle: (title) => {
        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.title = title;
        }))
    },
    toggleRating: () => {
        set(produce((state: TStoreState) => {
            //TODO: Implement this once the backend is ready
        }))
    },
    fetchPost: async (id) => {
        const post = await fetchPost(id);
        set(produce((state: TStoreState) => {
            state.singlePost.post = post;
        }))
    },
    fetchPostAuthor: async () => {
        const authorId = useAppStore.getState().singlePost.post?.authorProfileId;
        if (!authorId) {
            console.log("postslice: no author id found");
            return;
        }

        const author = await fetchProfile(authorId);
        set(produce((state: TStoreState) => {
            state.singlePost.postAuthor = author;
        }))
    },
})