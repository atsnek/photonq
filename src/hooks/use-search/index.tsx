export { UseSearchResult } from './use-docs-search';
export type { SearchIndex } from './types';

import { useMemo } from 'react';
import { FaFlask } from '@react-icons/all-files/fa/FaFlask';
import { TSearchResults } from '../../utils/search/types';
import useDocsSearch from './use-docs-search';
import useSocialSearch from './use-social-search';
import TbBooks from '../../components/icons/tabler/TbBooks';
import TbUsers from '../../components/icons/tabler/TbUsers';

const useSearch = (
  query?: string
): {
  searchResult: TSearchResults;
  isLoading: boolean;
} => {
  const docsSearch = useDocsSearch(query || '');
  const socialSearch = useSocialSearch(query);

  const searchResult = useMemo(() => {
    return {
      docs: {
        title: 'Documentation',
        sections: docsSearch.searchResults,
        icon: <TbBooks />
      },
      ...socialSearch.searchResults
    };
  }, [docsSearch, socialSearch]);

  const isLoading = docsSearch.isLoading || socialSearch.isLoading;

  return {
    searchResult,
    isLoading
  };
};

export default useSearch;
