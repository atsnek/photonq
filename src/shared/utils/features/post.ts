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