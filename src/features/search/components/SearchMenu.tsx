import {
  Center,
  Divider,
  ThemeProvider,
  VStack,
  useDisclosure,
  Text
} from '@chakra-ui/react';
import {
  FC,
  Fragment,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { FaFlask } from '@react-icons/all-files/fa/FaFlask';

import { TSearchResults } from '../../../shared/types/search';
import {
  fetchDefaultSearchresult,
  searchDocs,
  searchSocialPosts,
  searchUser
} from '../../../shared/utils/search';
import { SearchProvider } from '../../../search/search-provider';
import { useSearch } from '../../../search/use-search';
import theme from '../../../styles/theme/theme';
import {
  SearchResultSection,
  SearchResultSectionTitle
} from './SearchResultSection';
import SearchButton from './SearchButton';
import SearchModal from './SearchModal';
import TbBooks from '../../../shared/components/icons/tabler/TbBooks';
import TbUser from '../../../shared/components/icons/tabler/TbUser';
import { useAuthenticationContext } from '@atsnek/jaen';
import { navigate } from 'gatsby';
import { useSearchContext } from '../../../shared/contexts/search';

interface SearchMenuProps {}

/**
 * Search menu component - shows a navigatable list of search results
 */
const SearchMenu: FC<SearchMenuProps> = ({}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchData, setSearchData } = useSearchContext();
  const [navigateIdx, setNavigateIdx] = useState<number>(-1);
  const modalDisclosure = useDisclosure();
  const ref = useRef<{
    searchTimout: NodeJS.Timeout | undefined;
    changedQuery: boolean;
  }>({
    searchTimout: undefined,
    changedQuery: false // We use this to prevent the menu from fetching the default search results on first render since this is already done in the context provider
  });
  const currentUserId = useAuthenticationContext().user?.id;
  const search = useSearch();

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Retrieve the search data
      if (ref.current.searchTimout) clearTimeout(ref.current.searchTimout);
      ref.current.searchTimout = setTimeout(fetchSearchResults, 500);
      ref.current.changedQuery = true;
    } else {
      if (ref.current.searchTimout) clearTimeout(ref.current.searchTimout);
      if (ref.current.changedQuery)
        fetchDefaultSearchresult(currentUserId, search.searchIndex).then(
          setSearchData
        );
    }
  }, [searchQuery, currentUserId, search.searchIndex]);

  useEffect(() => {
    if (
      searchQuery.length === 0 &&
      Object.keys(searchData)
        .map(key => searchData[key as keyof TSearchResults].sections.length)
        .reduce((a, b) => a + b, 0) === 0
    ) {
    }
  }, []);

  useEffect(() => {
    // Focus the input when the user presses the shortcut
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        const el = document.activeElement as HTMLElement;

        // Check if the current active element is not contenteditable
        if (
          el.isContentEditable ||
          el.tagName === 'INPUT' ||
          el.tagName === 'TEXTAREA'
        )
          return;

        modalDisclosure.onOpen();

        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleGlobalKeydown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeydown);
    };
  }, []);

  const fetchSearchResults = async () => {
    const docsResults = await searchDocs(searchQuery, search.searchIndex);
    const socialPostResults = await searchSocialPosts(searchQuery);
    const userResult = await searchUser(searchQuery);

    console.log('docsResults', docsResults, search.searchIndex);

    setSearchData({
      docs: {
        title: 'Documentation',
        sections: docsResults,
        icon: <TbBooks />
      },
      posts: {
        title: 'Experiments',
        sections: socialPostResults,
        icon: <FaFlask />
      },
      user: { title: 'Users', sections: userResult, icon: <TbUser /> }
    });
    setNavigateIdx(0);
  };

  /**
   * The search result items to display in the search modal
   */
  const resultItems = useMemo(() => {
    const output: ReactNode[] = [];
    let itemIdx = 0;
    let sectionIdx = 0;

    const haveSomeResults = Object.values(searchData).some(
      section => section.sections.length > 0
    );

    if (!haveSomeResults && searchQuery.length > 0) {
      return [
        <Center
          w="full"
          my={3}
          fontSize="sm"
          color="features.search.noResults.text.color"
        >
          No results found for "
          <Text as="span" fontStyle="italic">
            {searchQuery}
          </Text>
          ". Please try another search.
        </Center>
      ];
    }

    // Mark the item as highlighted if its index matches the navigateIdx
    if (navigateIdx >= 0) {
      Object.values(searchData).forEach(section => {
        section.sections.find(subSection => {
          subSection.results.forEach(item => {
            if (itemIdx++ === navigateIdx) {
              item.isActive = true;
              return true;
            }
            if (item.isActive) item.isActive = false;
            return false;
          });
          return false;
        });
      });
    }
    itemIdx = 0; // Reset the item index

    for (const key in searchData) {
      const isDocs = key === 'docs' && searchQuery.length > 0;
      const section = searchData[key as keyof TSearchResults];
      if (haveSomeResults && section.sections.length === 0) continue;
      output.push(
        <Fragment key={itemIdx}>
          {itemIdx > 0 && <Divider />}
          <SearchResultSectionTitle
            title={section.title}
            idx={itemIdx * -1}
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
                isDocs={isDocs}
              />
            ))}
          </VStack>
        </Fragment>
      );
      sectionIdx++;
    }
    return output;
  }, [searchData, navigateIdx]);

  useEffect(() => {
    if (navigateIdx >= 0) {
      const item = document.getElementById(`sd-search-ri-${navigateIdx}`);
      if (item) item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [resultItems]);

  /**
   * Navigate to the next or previous item in the search results
   * @param isUp Whether to navigate up or down
   */
  const handleNavigate = (isUp: boolean) => {
    const itemsCount = Object.values(searchData)
      .map(section => section.sections.map(s => s.results).flat())
      .flat().length;

    if (isUp) {
      if (navigateIdx > 0) setNavigateIdx(navigateIdx - 1);
      else setNavigateIdx(itemsCount - 1);
      return;
    }

    if (navigateIdx < itemsCount - 1) setNavigateIdx(navigateIdx + 1);
    else setNavigateIdx(0);
  };

  /**
   * Navigate to the active item's href
   */
  const handleOpenActiveItem = () => {
    const activeItem = Object.values(searchData)
      .map(section => section.sections.map(s => s.results).flat())
      .flat()
      .find(item => item.isActive);
    if (activeItem) {
      modalDisclosure.onClose();
      navigate(activeItem.href);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchProvider>
        <SearchButton
          openModal={modalDisclosure.onOpen}
          navigate={handleNavigate}
        />
      </SearchProvider>
      <SearchModal
        defaultQuery={searchQuery}
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        searchResultItems={resultItems}
        setSearchQuery={setSearchQuery}
        handleNavigate={handleNavigate}
        openActiveItem={handleOpenActiveItem}
      />
    </ThemeProvider>
  );
};

export default SearchMenu;
