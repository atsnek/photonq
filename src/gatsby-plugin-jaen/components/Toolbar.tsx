import SearchMenu from '../../features/search/components/SearchMenu';
import { useEffect, useState } from 'react';
import { TSearchResultSection, TSearchResults } from '../../shared/types/search';
import { SearchContext } from '../../shared/contexts/search';
import {
  fetchDefaultSearchresult,
  getDefaultSearchDocs,
  getDefaultSearchUsers,
  searchSocialPosts
} from '../../shared/utils/search';
import { useAuthenticationContext } from '@atsnek/jaen';
import TbBook from '../../shared/components/icons/tabler/TbBook';
import TbBooks from '../../shared/components/icons/tabler/TbBooks';
import TbUser from '../../shared/components/icons/tabler/TbUser';
import { useSearch } from '../../search/use-search';

export interface ToolbarProps {}

export const Toolbar: React.FC<ToolbarProps> = () => {
  const [searchData, setSearchData] = useState<TSearchResults>({});
  const currentUserId = useAuthenticationContext().user?.id;
  const search = useSearch();

  useEffect(() => {
    getDefaultSearchResults();
  }, []);

  const getDefaultSearchResults = async () => {
    const res = await fetchDefaultSearchresult(currentUserId, search.searchIndex);
    setSearchData(res);
  };

  return (
    <SearchContext.Provider value={{ data: searchData, setSearchData }}>
      <SearchMenu />
    </SearchContext.Provider>
  );
};
