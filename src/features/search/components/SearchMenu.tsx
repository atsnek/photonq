import { Center, Divider, ThemeProvider, VStack, useDisclosure, Text } from '@chakra-ui/react';
import { FC, Fragment, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { TSearchResults } from '../../../shared/types/search';
import {
  getDefaultSearchDocs,
  getDefaultSearchUsers,
  searchDocs,
  searchSocialPosts,
  searchUser
} from '../../../shared/utils/search';
import { SearchProvider } from '../../../search/search-provider';
import { useSearch } from '../../../search/use-search';
import theme from '../../../styles/theme/theme';
import { SearchResultSection, SearchResultSectionTitle } from './SearchResultSection';
import TbBook from '../../../shared/components/icons/tabler/TbBook';
import SearchButton from './SearchButton';
import SearchModal from './SearchModal';
import TbBooks from '../../../shared/components/icons/tabler/TbBooks';
import TbUser from '../../../shared/components/icons/tabler/TbUser';
import { useAuthenticationContext } from '@atsnek/jaen';

interface SearchMenuProps {}

/**
 * Search menu component - shows a navigatable list of search results
 */
const SearchMenu: FC<SearchMenuProps> = ({}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultData, setSearchResultData] = useState<TSearchResults>({});
  const [navigateIdx, setNavigateIdx] = useState<number>(-1);
  const modalDisclosure = useDisclosure();
  const ref = useRef<{ searchTimout: NodeJS.Timeout | undefined }>({ searchTimout: undefined });
  const currentUserId = useAuthenticationContext().user?.id;

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Retrieve the search data
      if (ref.current.searchTimout) clearTimeout(ref.current.searchTimout);
      ref.current.searchTimout = setTimeout(fetchSearchResults, 500);
    } else {
      if (ref.current.searchTimout) clearTimeout(ref.current.searchTimout);
      fetchDefaultSearchResults();
    }
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    console.log('fetching search results', searchQuery);
    const docsResults = await searchDocs(searchQuery, search.searchIndex);
    const socialPostResults = await searchSocialPosts(searchQuery);
    const userResult = await searchUser(searchQuery);

    setSearchResultData({
      docs: { title: 'Documentation', sections: docsResults, icon: <TbBooks /> },
      community: { title: 'Community Posts', sections: socialPostResults, icon: <TbBook /> },
      user: { title: 'Users', sections: userResult, icon: <TbUser /> }
    });
    setNavigateIdx(0);
  };

  const fetchDefaultSearchResults = async () => {
    const userResults = currentUserId ? await getDefaultSearchUsers(currentUserId) : [];
    const docsResults = await getDefaultSearchDocs(search.searchIndex);
    const socialPostResults = await searchSocialPosts();

    setSearchResultData({
      docs: { title: 'Documentation', sections: docsResults, icon: <TbBooks /> },
      community: { title: 'Community Posts', sections: socialPostResults, icon: <TbBook /> },
      user: { title: 'Users', sections: userResults, icon: <TbUser /> }
    });
    setNavigateIdx(0);
  };

  const resultItems = useMemo(() => {
    const output: ReactNode[] = [];
    let itemIdx = 0;
    let sectionIdx = 0;

    const haveSomeResults = Object.values(searchResultData).some(
      section => section.sections.length > 0
    );

    if (!haveSomeResults && searchQuery.length > 0) {
      return [
        <Center w="full" my={3} fontSize="sm" color="features.search.noResults.text.color">
          No results found for "
          <Text as="span" fontStyle="italic">
            {searchQuery}
          </Text>
          ". Please try another search.
        </Center>
      ];
    }

    for (const key in searchResultData) {
      const section = searchResultData[key as keyof TSearchResults];
      if (haveSomeResults && section.sections.length === 0) continue;
      output.push(
        <Fragment key={itemIdx}>
          {itemIdx > 0 && <Divider />}
          <SearchResultSectionTitle
            title={section.title}
            idx={itemIdx++}
            color="features.search.section.title.color"
            textTransform="none"
            {...(!section.icon && {
              mb: 5
            })}
          />
          <VStack
            spacing={1}
            w="full"
            textAlign="left"
            _last={{
              mb: 2
            }}
            maxH="205px"
            overflowY="auto"
            className="sd-search-outer-section"
          >
            {section.sections.map(subSection => (
              <SearchResultSection
                section={subSection}
                idx={itemIdx}
                query={searchQuery}
                key={itemIdx}
                defaultHighlight={itemIdx++ === 0}
                icon={section.icon}
              />
            ))}
          </VStack>
        </Fragment>
      );
      sectionIdx++;
    }
    return output;
  }, [searchResultData]);

  const search = useSearch();

  useEffect(() => {
    // Focus the input when the user presses the shortcut
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') modalDisclosure.onOpen();
    };
    window.addEventListener('keydown', handleGlobalKeydown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeydown);
    };
  }, []);

  const handleNavigate = (isUp: boolean) => {
    if (isUp && navigateIdx > 0) {
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchProvider>
        <SearchButton openModal={modalDisclosure.onOpen} navigate={handleNavigate} />
      </SearchProvider>
      <SearchModal
        defaultQuery={searchQuery}
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        searchResultItems={resultItems}
        setSearchQuery={setSearchQuery}
      />
    </ThemeProvider>
  );
};

export default SearchMenu;
