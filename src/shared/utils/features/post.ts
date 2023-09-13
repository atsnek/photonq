import { format } from 'date-fns';

export const formatPostDate = (date?: string, dateFormat: 'l' | 's' = 's') => {
    if (!date) return '';
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';

    let dateSchema = '';
    if (dateFormat === 's') dateSchema = 'y-MM-dd';
    else dateSchema = 'dd. MMMM y';

    return format(dateObj, dateSchema);
}