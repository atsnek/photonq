import { sq } from '@/clients/social';
import { ReactNode, useEffect, useMemo } from 'react';
import { useLazyQuery, useQuery } from 'snek-query/react-hooks';
import { FaFlask } from '@react-icons/all-files/fa/FaFlask';
import TbUser from '../../components/icons/tabler/TbUser';
import TbUsers from '../../components/icons/tabler/TbUsers';

/**
 * A single search result.
 */
export type TSearchResult = {
  avatarURL?: string;
  title: string;
  description: string;
  to: string;
  isActive?: boolean;
};
/**
 * The combined search results.
 */
export type TSearchResults = Record<
  string,
  { title: string; sections: TSearchResultSection[]; icon?: ReactNode }
>;
// {
//   docs: TSearchResultSection[];
//   community: TSearchResultSection[];
//   users: TSearchResultSection[];
// }

/**
 * A single search result section.
 */
export type TSearchResultSection = {
  title: string;
  results: TSearchResult[];
  icon?: ReactNode;
  resultIcon?: ReactNode;
};

const useSocialSearch = (query?: string) => {
  const [trigger, { data, isLoading, isSafe, errors, refetch }] =
    useLazyQuery(sq);

  const postSearchResultSection: TSearchResults = useMemo(() => {
    if (query === undefined) {
      return {};
    }

    const searched = data.search({ query });

    let usersResult: TSearchResultSection | undefined = undefined;
    let postsResult: TSearchResultSection | undefined = undefined;

    if (searched.users?.nodes) {
      usersResult = {
        title: 'Users',
        results: searched.users.nodes.map(user => ({
          title: user.profile.displayName || user.profile.userName,
          description: user.bio || '',
          to: `/users/${user.id}`,
          avatarURL: user.profile.avatarUrl || undefined
        })),
        resultIcon: <TbUser />
      };
    }

    if (searched.posts?.nodes) {
      postsResult = {
        title: 'Experiments',
        results: searched.posts.nodes.map(post => ({
          title: post.title,
          description: post.matchingQuery({ query }) || post.summary || '',
          to: `/experiments/${post.slug}`
        })),
        resultIcon: <FaFlask />
      };
    }

    if (errors?.length) {
      return {};
    }

    return {
      users: {
        title: 'Users',
        sections: usersResult ? [usersResult] : [],
        icon: <TbUsers />
      },
      posts: {
        title: 'Experiments',
        sections: postsResult ? [postsResult] : [],
        icon: <FaFlask />
      }
    } as TSearchResults;
  }, [query, data, isLoading]);

  useEffect(() => {
    if (query === undefined) {
      return;
    }

    refetch();
  }, [query]);

  return {
    searchResults: postSearchResultSection,
    isLoading: !isSafe
  };
};

export default useSocialSearch;
