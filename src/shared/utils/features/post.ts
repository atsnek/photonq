import { sq } from '@snek-functions/origin';
import { TPost, TPostPreview } from '../../../features/post/types/post';
// import { format } from 'date-fns';

//TODO: This would come from an API
// const posts: TPostPreview[] = [
//   {
//     id: '1',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 1423,
//     url: '#'
//   },
//   {
//     id: '2',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 1423,
//     url: '#'
//   },
//   {
//     id: '3',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 1423,
//     url: '#'
//   },
//   {
//     id: '4',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 1423,
//     hasLiked: true,
//     url: '#'
//   },
//   {
//     id: '5',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 500,
//     url: '#'
//   },
//   //....
//   {
//     id: '1',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 1423,
//     url: '#',
//     canManage: true
//   },
//   {
//     id: '2',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 1423,
//     url: '#'
//   },
//   {
//     id: '3',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 1423,
//     url: '#'
//   },
//   {
//     id: '4',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 1423,
//     hasLiked: true,
//     url: '#'
//   },
//   {
//     id: '5',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 500,
//     url: '#'
//   },
//   {
//     id: '1',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 1423,
//     url: '#'
//   },
//   {
//     id: '2',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 1423,
//     url: '#'
//   },
//   {
//     id: '3',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 1423,
//     url: '#'
//   },
//   {
//     id: '4',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 1423,
//     hasLiked: true,
//     url: '#'
//   },
//   {
//     id: '5',
//     publicationDate: '2023-16-15',
//     author: 'Emily Brooks',
//     title: 'Unlocking the Power of Quantum Computing',
//     summary:
//       'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
//     likes: 500,
//     url: '#'
//   }
// ];

// export { posts };

export const formatPostDate = (date?: string, dateFormat: 'l' | 's' = 's') => {
    if (!date) return '';
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';

    //TODO: Use date-fns once the bug is fixed
    let dateSchema: Intl.DateTimeFormatOptions = {};

    if (dateFormat === 's') dateSchema = { month: '2-digit', day: '2-digit', };
    else dateSchema = 'd MMMM y';

    // return format(dateObj, dateSchema);
    return dateObj.toLocaleDateString('en-US', dateSchema);
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