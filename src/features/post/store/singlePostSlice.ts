import { getUserDisplayname } from "../../user/utils/user";
import { produce } from "immer";
import { TSinglePostSlice } from "../types/singlePostState";
import { TStoreSlice, TStoreState } from "../../../shared/types/store";
import { sq } from "@snek-functions/origin";
import { asEnumKey } from "snek-query";
import { EnPostLanguage, TPost, TPostPrivacy } from "../types/post";
import { TUser } from "../../user/types/user";
import { PrivacyInputInput } from "@snek-functions/origin/dist/schema.generated";
import { osg } from "@atsnek/jaen";

export const createSinglePostSlice: TStoreSlice<TSinglePostSlice> = (set, get) => ({
    postAuthor: null,
    post: undefined,
    editContent: async (content) => {
        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.content = content;
        }))
        return true;
    },
    editSummary: async (summary) => {
        const post = get().singlePost.post;
        if (!post || post.summary === summary) return false;
        sq.mutate(m => m.socialPostUpdate({ postId: post.id, values: { summary } }))
        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.summary = summary;
        }))
        return true;
    },
    editTitle: async (title) => {
        const post = get().singlePost.post;
        if (!post || post.title === title) return false;
        sq.mutate(m => m.socialPostUpdate({ postId: post.id, values: { title } }))
        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.title = title;
        }))
        return true;
    },
    fetchPost: async (slug) => {

        const [currentUser] = await sq.query(q => q.userMe);
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
                stars: post.stars()?.length ?? 0,
                hasRated: post.stars()?.some(star => star.profile.id === currentUser?.id) ?? false,
                summary: post.summary,
                title: post.title,
                canManage: currentUser?.id === post.profileId,
                language: EnPostLanguage.ENGLISH, //TODO: Implement this
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
        if (!get().singlePost.post) return false;
        const { fileUrl } = await osg.uploadFile(src);

        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.avatarUrl = fileUrl;
        }))

        await sq.mutate(q => q.socialPostUpdate({ postId: get().singlePost.post?.id ?? '', values: { avatarURL: fileUrl } }));

        get().singlePost.fetchPost(get().singlePost.post?.slug ?? '');
        return true;
    },
    togglePrivacy: async () => {
        const isPublished = get().singlePost.post?.privacy === 'PUBLIC';
        const newPrivacy = isPublished ? 'PRIVATE' : 'PUBLIC';
        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.privacy = isPublished ? 'PRIVATE' : 'PUBLIC';
        }));

        const postId = get().singlePost.post?.id ?? '';
        const [, error] = await sq.mutate(m => m.socialPostUpdate({ postId, values: { privacy: asEnumKey(PrivacyInputInput, newPrivacy) } }));

        const updateSucceed = await get().singlePost.fetchPost(get().singlePost.post?.slug ?? '');
        return !!error && updateSucceed;
    },
    changeLanguage: async (language) => {
        //TODO: Implement this
        console.log("new language: ", language);
        set(produce((state: TStoreState) => {
            if (!state.singlePost.post) return;
            state.singlePost.post.language = language;
        }))
        return true;
    },
})