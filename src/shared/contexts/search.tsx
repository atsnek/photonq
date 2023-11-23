import { createContext, useContext } from 'react';
import { TSearchResults } from '../types/search';
import search from '../../pages/search';
import TbBook from '../components/icons/tabler/TbBook';
import TbBooks from '../components/icons/tabler/TbBooks';
import TbUser from '../components/icons/tabler/TbUser';
import { searchDocs, searchSocialPosts, searchUser } from '../utils/search';
import { SearchIndex } from '../../search/types';

export type TSearchContext = {
  data: TSearchResults;
  fetchSearchResults: (query: string, index: SearchIndex) => Promise<void>;
};

/**
 * The search context representing the search results.
 */
export const SearchContext = createContext<TSearchContext>({
  data: {},
  fetchSearchResults: async () => {}
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
