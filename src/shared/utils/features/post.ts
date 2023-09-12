import { sq } from '@snek-functions/origin';
import { TPost, TPostPreview } from '../../../features/post/types/post';

export const formatPostDate = (date?: string, dateFormat: 'l' | 's' = 's') => {
    if (!date) return '';
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';

    //TODO: Use date-fns once the bug is fixed
    let dateSchema: Intl.DateTimeFormatOptions = {};

    if (dateFormat === 's') dateSchema = { month: '2-digit', day: '2-digit', };
    // else dateSchema = 'd MMMM y';

    // return format(dateObj, dateSchema);
    return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
}

/**
 * Fetches a specific post from the database
 * @param id  The id of the user to fetch the posts of
 * @param isAuthenticated Whether the user is authenticated or not
 * @returns The post data
 */
export const fetchPost = async (id: string, isAuthenticated?: boolean): Promise<TPost | undefined> => {
    const [post, error] = await sq.query((q): TPost | undefined => {
        const post = q.socialPost({ postId: id });
        if (!post) return;
        const { id: currentUserId } = isAuthenticated && q.userMe
            ? q.userMe
            : { id: undefined };

        return {
            id: post.id,
            title: post.title,
            summary: post.summary,
            content: post.content ?? undefined,
            createdAt: post.createdAt,
            avatarUrl: post.avatarURL,
            stars: post.stars.length,
            privacy: post.privacy ?? 'private',
            canManage: false, //TODO: Replace this with actual data as soon as it's available
            authorProfileId: post.profileId
        };
    });

    if (error) return;
    console.log('fetched post', post);
    return post;
};