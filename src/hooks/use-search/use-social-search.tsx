import { sq } from '@/clients/social';
import { ReactNode, useEffect, useMemo } from 'react';
import { useLazyQuery, useQuery } from 'snek-query/react-hooks';
import { FaFlask } from '@react-icons/all-files/fa/FaFlask';
import TbUser from '../../components/icons/tabler/TbUser';

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

  const postSearchResultSection: TSearchResultSection[] = useMemo(() => {
    if (query === undefined) {
      return [];
    }

    const searched = data.search({ query });

    console.log('users', searched.users?.nodes);

    const results: TSearchResultSection[] = [];

    if (searched.users?.nodes) {
      results.push({
        title: 'Users',
        results: searched.users.nodes.map(user => ({
          title: user.profile.displayName || user.profile.userName,
          description: user.bio || '',
          to: `/users/${user.id}`,
          avatarURL: user.profile.avatarUrl || undefined
        })),
        resultIcon: <TbUser />
      });
    }

    if (searched.posts?.nodes) {
      results.push({
        title: 'Experiments',
        results: searched.posts.nodes.map(post => ({
          title: post.title,
          description: post.matchingQuery({ query }) || post.summary || '',
          to: `/experiments/${post.slug}`
        })),
        resultIcon: <FaFlask />
      });
    }

    if (errors?.length) {
      return [];
    }

    return results;
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
