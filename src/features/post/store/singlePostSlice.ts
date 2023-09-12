import { fetchPost } from "../../../shared/utils/features/post";
import { useAppStore } from "../../../shared/store/store";
import { fetchProfile, getUserDisplayname } from "../../user/utils/user";
import { produce } from "immer";
import { TSinglePostSlice } from "../types/singlePostState";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { sq } from "@snek-functions/origin";
import { TPost, TPostPrivacy } from "../types/post";
import { ObjectAndUser } from "@snek-functions/origin/dist/schema.generated";
import { TUser } from "../../user/types/user";

export const createSinglePostSlice: TStoreSlice<TSinglePostSlice> = (set, get) => ({
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
    fetchPost: async (slug) => {

        const [currentUser] = await sq.query(q => q.userMe);

        console.log("fetch post with slug: ", slug);

        //TODO: Replace postId with slug once the backend is ready
        const [post, postError] = await sq.query((q): TPost | null => {
            const post = q.socialPost({ slug: slug })

            if (!post) return null;

            return {
                authorProfileId: post.profileId,
                avatarUrl: post.avatarURL,
                content: post.content,
                createdAt: post.createdAt,
                id: post.id,
                privacy: post.privacy as TPostPrivacy,
                stars: post.stars?.length ?? 0,
                hasRated: post.stars?.some(star => star.profile.id === currentUser?.id) ?? false,
                summary: post.summary,
                title: post.title,
                canManage: currentUser?.id === post.profileId,
            };
        });

        if (postError) return false;

        const [author, authorError] = await sq.query((q): TUser => {
            const user = q.user({ id: post?.authorProfileId ?? '' })
            return {
                id: user.id,
                username: user.username,
                displayName: getUserDisplayname(user),
                bio: user.profile?.bio ?? null,
                socials: [],
                avatarUrl: user.details?.avatarURL ?? undefined,
                location: undefined,
            }
        });

        set(produce((state: TStoreState): void => {
            if (post === null) return;
            state.singlePost.post = post;
            state.singlePost.postAuthor = author;
        }))

        return true;
    },
    // fetchPostAuthor: async () => {
    // const authorId = useAppStore.getState().singlePost.post?.authorProfileId;
    // if (!authorId) {
    //     console.log("singlePostSlice: no author id found");
    //     return;
    // }

    // const [author, error] = await sq.query(q => q.user({ id: authorId }));

    // console.log("post author: ", author.details?.firstName);
    // if (error) return;

    // set(produce((state: TStoreState) => {
    //     state.singlePost.postAuthor = {
    //         id: author.id,
    //         username: author.username,
    //         displayName: getUserDisplayname(author),
    //         bio: author.profile?.bio ?? null,
    //         socials: [],
    //         avatarUrl: author.details?.avatarURL ?? undefined,
    //         location: undefined,
    //     };
    // }))
    // },
    ratePost: async () => {
        console.log("rating post...");
        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.hasRated = true;
        }));

        const [, error] = await sq.mutate(m => m.socialPostStar({ postId: get().singlePost.post?.id ?? '' }));

        const updateSucceed = await get().singlePost.fetchPost(get().singlePost.post?.id ?? '');
        return !!error && updateSucceed;

    },
    unratePost: async () => {
        console.log("unrating post...");
        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.hasRated = false;
        }));

        const [, error] = await sq.mutate(m => m.socialPostUnstar({ postId: get().singlePost.post?.id ?? '' }));

        const updateSucceed = await get().singlePost.fetchPost(get().singlePost.post?.id ?? '');
        return !!error && updateSucceed;
    },
    updatePreviewImage: async (src) => {

    },
})