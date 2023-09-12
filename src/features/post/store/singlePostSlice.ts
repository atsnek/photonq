import { getUserDisplayname } from "../../user/utils/user";
import { produce } from "immer";
import { TSinglePostSlice } from "../types/singlePostState";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { sq } from "@snek-functions/origin";
import { asEnumKey } from "snek-query";
import { TPost, TPostPrivacy } from "../types/post";
import { TUser } from "../../user/types/user";
import { PrivacyInputInput } from "@snek-functions/origin/dist/schema.generated";

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
                slug: post.slug,
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
    togglePostRating: async () => {
        const hasRated = get().singlePost.post?.hasRated ?? false;
        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.hasRated = !state.singlePost.post.hasRated;
        }));

        const postId = get().singlePost.post?.id ?? '';
        const [, error] = await sq.mutate(m => {
            if (hasRated) m.socialPostUnstar({ postId })
            else m.socialPostStar({ postId })
        });

        const updateSucceed = await get().singlePost.fetchPost(get().singlePost.post?.slug ?? '');
        return !!error && updateSucceed;
    },
    updatePreviewImage: async (src) => {

    },
    togglePrivacy: async () => {
        const isPublished = get().singlePost.post?.privacy === 'public';
        const newPrivacy = isPublished ? 'private' : 'public';
        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.privacy = isPublished ? 'private' : 'public';
        }));

        const postId = get().singlePost.post?.id ?? '';
        const [, error] = await sq.mutate(m => m.socialPostUpdate({ postId, values: { privacy: asEnumKey(PrivacyInputInput, newPrivacy) } }));

        const updateSucceed = await get().singlePost.fetchPost(get().singlePost.post?.slug ?? '');
        return !!error && updateSucceed;
    },
})