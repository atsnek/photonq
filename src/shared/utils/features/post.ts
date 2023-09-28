import { LanguageInputInput, Post, PrivacyInputInput, Query, User } from '@snek-functions/origin/dist/schema.generated';
import { format } from 'date-fns';
import { EnPostLanguage, TPaginatedPostListData, TPost, TPostDateRange, TPostPreview, TPostPrivacy } from '../../../features/post/types/post';
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
            id: author?.id ?? '',
            username: author?.username ?? '',
            displayName: author ? getUserDisplayname(author) : '',
            avatarUrl: author?.details?.avatarURL,
        },
        stars: post?.stars()?.totalCount ?? 0,
        hasRated: !!post && !!post.stars().edges && post?.stars().edges?.findIndex(s => s.node.profile?.id === currentUser?.id) !== -1,
        canManage: post?.profileId === currentUser?.id,
    }
};

/**
 * Search posts by a query
 * @param searchQuery The search query
 * @param limit The amount of posts to fetch
 * @param privacy  The privacy of posts to fetch
 * @param cursor The cursor to fetch posts from (optional). If not provided, the first posts will be fetched
 * @param currentUser The current user (if exists)
 * @param userId  The user id to fetch posts from (optional). If identical to the current user, private posts will be fetched as well
 * @param language The language of posts to fetch (optional)
 * @param dateRange The date range of posts to fetch (optional)
 * @returns The post list data
 */
export const searchPosts = async (searchQuery: string, limit: number, privacy: TPostPrivacy, cursor?: string, currentUser?: t.Nullable<User>, userId?: string, language?: EnPostLanguage, dateRange?: TPostDateRange): Promise<TPaginatedPostListData> => {
    const [postConnection,] = await sq.query(q => {
        const requestArgs: Parameters<typeof q.allSocialPost>[0] = {
            filters: { privacy: asEnumKey(PrivacyInputInput, privacy) },
            first: limit,
        };

        if (requestArgs.filters) {
            if (searchQuery.length > 0) {
                requestArgs.filters.query = searchQuery;
            }

            if (userId) {
                requestArgs.filters.userId = userId;
            }

            if (language) {
                requestArgs.filters.language = asEnumKey(LanguageInputInput, language);
            }

            if (dateRange?.from) {
                requestArgs.filters.from = `${dateRange.from.getFullYear()}-${dateRange.from.getMonth() + 1}-${dateRange.from.getDate()}`;
            }
            if (dateRange?.to) {
                requestArgs.filters.to = `${dateRange.to.getFullYear()}-${dateRange.to.getMonth() + 1}-${dateRange.to.getDate()}`;
            }
        }

        if (cursor) {
            requestArgs.after = cursor;
        }

        const posts = q.allSocialPost(requestArgs);
        //! This is a workaround for a (probably) limitation of snek-query - Otherwise, not all required props will be fetched. We also can't simply put the buildPost mapper inside this query, because it's user acquisition breaks the whole query due to an auth error. This loop just acesses all props of the first post, which will inform the proxy to fetch all props of all posts
        posts?.pageInfo.hasNextPage;
        posts?.pageInfo.endCursor;
        posts?.edges.forEach(pe => {
            try {
                pe.node.stars().edges.map(se => se.node.profile.id);
                pe.node.stars().totalCount;
                for (const key in pe.node) {
                    pe.node[key as keyof typeof pe.node];
                }
            } catch { }
        })
        return posts;
    })

    const postEdges = postConnection?.edges ?? [];
    //* We need to query each post in a separate query until snek-query offers us a better way to do this
    const postPreviews = await Promise.all(postEdges.map(async (p) => {
        return (await sq.query(q => buildPostPreview(q, p.node as Post, currentUser)))[0];
    }));

    return {
        state: 'success',
        items: postPreviews ?? [],
        hasMore: postConnection?.pageInfo?.hasNextPage ?? false,
        totalCount: postConnection?.totalCount,
        nextCursor: postConnection?.pageInfo.hasNextPage ? postConnection?.pageInfo?.endCursor ?? '' : undefined,
        prevCursor: postConnection?.pageInfo.hasPreviousPage ? postConnection?.pageInfo.startCursor ?? '' : undefined,
    };
}

/**
 * Fetch a post by its id
 * @param postId The post id
 * @param hasRated Whether the current user has rated the post
 * @returns Whether the post was fetched successfully
 */
export const togglePostRating = async (postId: TPost['id'], hasRated: boolean): Promise<boolean> => {
    const [, error] = await sq.mutate(m => {
        if (hasRated) m.socialPostUnstar({ postId: postId });
        else m.socialPostStar({ postId: postId });
    });
    return !error || error?.length === 0;
}