import { ObjectAndUser, Post, PrivacyInputInput, Query, User } from '@snek-functions/origin/dist/schema.generated';
import { format } from 'date-fns';
import { TPostListData, TPostPreview } from '../../../features/post/types/post';
import { getUserDisplayname } from '../../../features/user/utils/user';
import { t, asEnumKey } from "snek-query";
import { sq } from '@snek-functions/origin';
/**
 * Format post date to a nicely readable format
 * @param date The date to format
 * @param dateFormat The format to use
 */
export const formatPostDate = (date?: string, dateFormat: 'l' | 's' = 's') => {
    if (!date) return '';
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';

    let dateSchema = '';
    if (dateFormat === 's') dateSchema = 'y-MM-dd';
    else dateSchema = 'dd. MMMM y';

    return format(dateObj, dateSchema);
}

/**
 * Build a post preview from a post object
 * @param q  The query object (snek-query)
 * @param post The post object to build the preview from
 * @param currentUser The current user (if exists)
 * @returns The post preview object
 */
export const buildPostPreview = (q: Query, post: t.Nullable<Post>, currentUser?: t.Nullable<User>): TPostPreview => {
    const author = q.user({ id: post?.profileId ?? '' });
    return {
        id: post?.id ?? '',
        slug: post?.slug ?? '',
        title: post?.title ?? '',
        summary: post?.summary ?? null,
        avatarUrl: post?.avatarURL ?? null,
        createdAt: formatPostDate(post?.createdAt),
        privacy: post?.privacy as any,
        profile: {
            id: post?.profileId ?? '',
            username: author.username,
            displayName: getUserDisplayname(author),
            avatarUrl: author.details?.avatarURL,
        },
        stars: post?.stars?.length ?? 0,
        hasRated: !!currentUser && post?.stars?.findIndex(s => s.profile.id === currentUser?.id) !== -1,
        canManage: post?.profileId === currentUser?.id,
    }
};

/**
 * Search posts by a query
 * @param searchQuery The search query
 * @param limit  The limit of posts to fetch
 * @param offset  The offset of posts to fetch
 * @param userId  The user id to fetch posts from (optional). If identical to the current user, private posts will be fetched as well
 * @returns The post list data
 */
export const searchPosts = async (searchQuery: string, limit: number, offset: number, currentUser?: t.Nullable<User>, userId?: string): Promise<TPostListData> => {

    const fetchSocialPosts = async (privacy: PrivacyInputInput) => {
        const [posts,] = await sq.query(q => {
            let rawPosts: t.Nullable<Post>[] = [];
            if (userId) {
                rawPosts = q.allSocialPost({ filters: { query: searchQuery, limit, offset, userId, privacy: asEnumKey(PrivacyInputInput, privacy) } });
            } else {
                rawPosts = q.allSocialPost({ filters: { query: searchQuery, limit, offset, privacy: asEnumKey(PrivacyInputInput, privacy) } });
            }
            const posts = rawPosts?.filter(p => p !== null).map((p) => buildPostPreview(q, p as Post, currentUser));
            return posts;
        })
        return posts;
    }

    const combinedPosts = [...(await fetchSocialPosts(PrivacyInputInput.public))];

    if (currentUser && currentUser.id === userId) {
        combinedPosts.push(...(await fetchSocialPosts(PrivacyInputInput.private)));
    }
    console.log("search result: ", combinedPosts)
    // if (rawError || buildError) return { state: 'error', posts: [] };
    return { state: 'success', posts: combinedPosts ?? [] };
}