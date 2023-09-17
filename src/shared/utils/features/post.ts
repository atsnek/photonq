import { FiltersInputInput, ObjectAndUser, Post, PrivacyInputInput, Query, User } from '@snek-functions/origin/dist/schema.generated';
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
            username: author?.username ?? '',
            displayName: author ? getUserDisplayname(author) : '',
            avatarUrl: author?.details?.avatarURL,
        },
        stars: post?.stars?.length ?? 0,
        hasRated: !!currentUser && post?.stars?.findIndex(s => s.profile?.id === currentUser?.id) !== -1,
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
    const canSeePrivate = currentUser && currentUser.id === userId;
    const requestLimit = canSeePrivate ? limit / 2 : limit;

    const fetchSocialPosts = async (privacy: PrivacyInputInput) => {
        const [rawPosts,] = await sq.query(q => {
            const filters: FiltersInputInput = { query: searchQuery, limit: requestLimit + 1, offset, privacy: asEnumKey(PrivacyInputInput, privacy) };
            if (userId) {
                filters.userId = userId;
            }
            const posts = q.allSocialPost({ filters });
            //! This is a workaround for a (probably) limitation of snek-query - Otherwise, not all required props will be fetched. We also can't simply put the buildPost mapper inside this query, because it's user acquisition breaks the whole query due to an auth error. This loop just acesses all props of the first post, which will inform the proxy to fetch all props of all posts
            if (posts.length > 0) {
                for (const key in posts[0]) {
                    posts[0][key as keyof typeof posts[0]];
                }
            }
            return posts;
        })

        const [posts,] = await sq.query(q => rawPosts?.map((p) => buildPostPreview(q, p as Post, currentUser)));
        return posts;
    }

    const publicPosts = await fetchSocialPosts(PrivacyInputInput.public);
    console.log(publicPosts, publicPosts.length, publicPosts.length - 2)
    const combinedPosts = [...publicPosts.slice(0, Math.max(publicPosts.length, publicPosts.length - 2))];

    let privatePosts: TPostPreview[] = [];
    if (canSeePrivate) {
        privatePosts = await fetchSocialPosts(PrivacyInputInput.private);
        combinedPosts.push(...privatePosts.slice(0, Math.max(privatePosts.length, privatePosts.length - 2)));
    }
    return {
        state: 'success',
        posts: combinedPosts ?? [],
        hasMore: publicPosts.length === requestLimit + 1 || privatePosts.length === requestLimit + 1
    };
}