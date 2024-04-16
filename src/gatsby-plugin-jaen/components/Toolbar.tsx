import { useEffect, useState } from 'react';
import SearchMenu from '../../components/search-menu';
import { SearchContext } from '../../contexts/search';
import useSearch from '../../hooks/use-search';
import { fetchDefaultSearchresult } from '../../utils/search';
import { TSearchResults } from '../../utils/search/types';

export interface ToolbarProps {}

export const Toolbar: React.FC<ToolbarProps> = () => {
  const [searchData, setSearchData] = useState<TSearchResults>({});
  const currentUserId = '1';
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
