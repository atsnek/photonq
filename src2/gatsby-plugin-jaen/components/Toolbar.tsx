import { useAuth } from '@atsnek/jaen';
import { useEffect, useState } from 'react';
import SearchMenu from '../../features/search/components/SearchMenu';
import { SearchContext } from '../../shared/contexts/search';
import { TSearchResults } from '../../shared/types/search';
import { fetchDefaultSearchresult } from '../../shared/utils/search';

import { useSearch } from '../../search/use-search';

export interface ToolbarProps {}

export const Toolbar: React.FC<ToolbarProps> = () => {
  const [searchData, setSearchData] = useState<TSearchResults>({});
  const currentUserId = useAuth().user?.id;
  const search = useSearch();

  useEffect(() => {
    getDefaultSearchResults();
  }, [currentUserId, search.searchIndex]);

  const getDefaultSearchResults = async () => {
    const res = await fetchDefaultSearchresult(
      currentUserId,
      search.searchIndex
    );
    setSearchData(res);
  };

  return (
    <SearchContext.Provider value={{ data: searchData, setSearchData }}>
      <SearchMenu />
    </SearchContext.Provider>
  );
};
