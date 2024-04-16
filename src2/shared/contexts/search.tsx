import { createContext, useContext } from 'react';
import { TSearchResults } from '../types/search';

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
