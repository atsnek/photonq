import {
  Connection_1,
  Connection_1_2,
  Edge_1_2,
  LanguageInputInput,
  Post,
  PrivacyInputInput,
  Query,
  User
} from '@snek-functions/origin/dist/schema.generated';
import { format } from 'date-fns';
import {
  EnPostLanguage,
  TPaginatedPostListData,
  TPost,
  TPostDateRange,
  TPostPreview,
  TPostPrivacy
} from '../../../features/post/types/post';
import { getUserDisplayname } from '../../../features/user/utils/user';
import { t, asEnumKey } from 'snek-query';
import { sq } from '@snek-functions/origin';
import { PartialBy } from '../../types/utilityTypes';

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
};

/**
 * Build a post preview from a post object
 * @param q  The query object (snek-query)
 * @param post The post object to build the preview from
 * @param currentUser The current user (if exists)
 * @returns The post preview object
 */
export const buildPostPreview = (
  q: Query,
  post: t.Nullable<Post>,
  currentUser?: t.Nullable<User>
): TPostPreview => {
  return {
    id: post?.id ?? '',
    slug: post?.slug ?? '',
    title: post?.title ?? '',
    summary: post?.summary ?? null,
    language: post?.language ?? EnPostLanguage.EN,
    avatarUrl: post?.avatarURL ?? null,
    createdAt: formatPostDate(post?.createdAt),
    privacy: post?.privacy as any,
    profile: {
      id: post?.profileId ?? '',
      username: post?.profile?.user?.username ?? '',
      displayName: post?.profile?.user ? getUserDisplayname(post.profile.user) : '',
      avatarUrl: post?.profile?.user?.details?.avatarURL
    },
    stars: post?.stars()?.totalCount ?? 0,
    hasRated:
      !!post &&
      !!post.stars().edges &&
      post
        ?.stars()
        .edges?.findIndex(s => s.node.profile?.id === currentUser?.id) !== -1,
    canManage: post?.profileId === currentUser?.id
  };
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
export const searchPosts = async (
  searchQuery: string,
  limit: number,
  privacy: TPostPrivacy,
  cursor?: string,
  currentUser?: t.Nullable<User>,
  userId?: string,
  language?: EnPostLanguage,
  dateRange?: TPostDateRange,
  dataSource: 'all-social' | 'starred' = 'all-social'
): Promise<TPaginatedPostListData> => {
  const [posts] = await sq.query(q => {
    const requestArgs: PartialBy<Parameters<typeof q.allSocialPost>[number], 'resourceId'> = {
      filters: {},
      first: limit
    };

    if (requestArgs.filters) {
      if (dataSource !== "starred") {
        requestArgs.filters.privacy = asEnumKey(PrivacyInputInput, privacy);
        requestArgs.resourceId = __SNEK_RESOURCE_ID__;

        if (userId) {
          requestArgs.filters.userId = userId;
        }
      }

      if (searchQuery.length > 0) {
        requestArgs.filters.query = searchQuery;
      }

      if (language) {
        requestArgs.filters.language = asEnumKey(LanguageInputInput, language);
      }

      if (dateRange?.from) {
        requestArgs.filters.from = `${dateRange.from.getFullYear()}-${dateRange.from.getMonth() + 1
          }-${dateRange.from.getDate()}`;
      }
      if (dateRange?.to) {
        requestArgs.filters.to = `${dateRange.to.getFullYear()}-${dateRange.to.getMonth() + 1
          }-${dateRange.to.getDate()}`;
      }
    }

    if (cursor) {
      requestArgs.after = cursor;
    }

    const posts = dataSource === 'all-social'
      ? q.allSocialPost(requestArgs as Parameters<typeof q.allSocialPost>[number])
      : q.user({ resourceId: __SNEK_RESOURCE_ID__, id: userId })?.profile?.starredPosts(requestArgs);
    if (!posts) return;
    //! This is a workaround for a (probably) limitation of snek-query - Otherwise, not all required props will be fetched. We also can't simply put the buildPost mapper inside this query, because it's user acquisition breaks the whole query due to an auth error. This loop just acesses all props of the first post, which will inform the proxy to fetch all props of all posts
    posts?.pageInfo.hasNextPage;
    posts?.pageInfo.endCursor;

    return {
      hasPreviousPage: posts?.pageInfo.hasPreviousPage,
      hasNextPage: posts?.pageInfo.hasNextPage,
      startCursor: posts?.pageInfo.startCursor,
      endCursor: posts?.pageInfo.endCursor,
      totalCount: posts?.totalCount,
      items: posts?.edges.map(pe => buildPostPreview(q, (dataSource === 'all-social' ? pe.node as Post : (pe as Edge_1_2).node.post), currentUser))
    }


    // posts?.edges.forEach(pe => {
    //   try {
    //     const node = dataSource === 'all-social' ? pe.node as Post : (pe as Edge_1_2).node.post;
    //     if (dataSource === 'starred') {
    //       (pe as Edge_1_2).node.post.stars().totalCount;
    //       node.stars().totalCount;
    //     }
    //     node.stars().edges.map(se => se.node.profile.id);
    //     node.stars().totalCount;
    //     for (const key in node) {
    //       node[key as keyof typeof node];
    //     }
    //   } catch { }
    // });
    // return posts;
  });

  return {
    state: 'success',
    items: posts?.items ?? [],
    hasMore: posts?.hasNextPage ?? false,
    totalCount: posts?.totalCount ?? 0,
    nextCursor: posts?.hasNextPage
      ? posts?.endCursor ?? ''
      : undefined,
    prevCursor: posts?.hasPreviousPage
      ? posts?.startCursor ?? ''
      : undefined,
  };
};

/**
 * Fetch a post by its id
 * @param postId The post id
 * @param hasRated Whether the current user has rated the post
 * @returns Whether the post was fetched successfully
 */
export const togglePostRating = async (
  postId: TPost['id'],
  hasRated: boolean
): Promise<boolean> => {
  const [, error] = await sq.mutate(m => {
    if (hasRated) m.socialPostUnstar({ postId: postId });
    else m.socialPostStar({ postId: postId });
  });
  return !error || error?.length === 0;
};

/**
 *  Triggers all root-level proxy props of a post so they are fetched by sq
 * @param post The post to trigger the props of
 */
export const triggerPostProxyProps = (post: Post): void => {
  post.stars().totalCount;
  post.stars().edges.map(se => se.node.profile.id);
  for (const key in post) {
    post[key as keyof typeof post];
  }
}
/* Delete a post by its id
* @param id The post id
* @returns Whether the post was deleted successfully
*/
export const deletePost = async (id: TPost['id']): Promise<boolean> => {
  const [, error] = await sq.mutate(m => m.socialPostDelete({ postId: id }));
  return error?.length === 0;
}
