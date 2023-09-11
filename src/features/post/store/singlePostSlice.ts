import { fetchPost } from "../../../shared/utils/features/post";
import { useAppStore } from "../../../shared/store/store";
import { fetchProfile, getUserDisplayname } from "../../user/utils/user";
import { produce } from "immer";
import { TSinglePostSlice } from "../types/singlePostState";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { sq } from "@snek-functions/origin";

export const createSinglePostSlice: TStoreSlice<TSinglePostSlice> = (set) => ({
    postAuthor: null,
    post: undefined,
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


        const [author, error] = await sq.query(q => q.user({ id: authorId }));

        if (error) return;

        set(produce((state: TStoreState) => {
            state.singlePost.postAuthor = {
                id: author.id,
                username: author.username,
                displayName: getUserDisplayname(author),
                bio: author.profile?.bio ?? null,
                socials: [],
                avatarUrl: author.details?.avatarURL ?? undefined,
                location: undefined,
            };
        }))
    },
})