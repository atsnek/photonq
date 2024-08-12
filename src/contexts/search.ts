import { createContext, useContext } from 'react';
import { TSearchResults } from '../utils/search/types';
import useSearch from '../hooks/use-search';

export type TSearchContext = {
  data: TSearchResults;
  setSearchData: (data: TSearchResults) => void;
};

/**
 * The search context representing the search results.
 */
export const SearchContext = createContext<TSearchContext>({
  data: {},
  setSearchData: () => {}
});

/**
 * Hook to use the search context.
 */
export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }

  return context;
};
