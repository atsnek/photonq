import { ObjectAndUser, Post, Query, User } from '@snek-functions/origin/dist/schema.generated';
import { format } from 'date-fns';
import { TPostPreview } from '../../../features/post/types/post';
import { getUserDisplayname } from '../../../features/user/utils/user';
import { t } from "snek-query";
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