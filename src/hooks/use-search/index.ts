export { UseSearchResult } from './use-docs-search';
export type { SearchIndex } from './types';

import useDocsSearch from './use-docs-search';
import useSocialSearch from './use-social-search';

const useSearch = (query?: string) => {
  const docsSearch = useDocsSearch(query || '');
  const socialSearch = useSocialSearch(query);

  const searchResult = docsSearch.searchResults.concat(
    socialSearch.searchResults
  );

  console.log('searchResult', docsSearch, socialSearch);

  const isLoading = docsSearch.isLoading || socialSearch.isLoading;

  return {
    searchResult,
    isLoading
  };
};

export default useSearch;
