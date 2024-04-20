import {
  Center,
  Divider,
  ThemeProvider,
  VStack,
  useDisclosure,
  Text,
  Box
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

import {
  fetchDefaultSearchresult,
  searchDocs,
  searchSocialPosts,
  searchUser
} from '../../utils/search';
import useSearch from '../../hooks/use-search';
import theme from '../../styles/theme/theme';
import {
  SearchResultSection,
  SearchResultSectionTitle
} from './SearchResultSection';
import SearchButton from './SearchButton';
import SearchModal from './SearchModal';
import TbBooks from '../icons/tabler/TbBooks';
import TbUser from '../icons/tabler/TbUser';
import { useAuth } from '@atsnek/jaen';
import { navigate } from 'gatsby';
import { useSearchContext } from '../../contexts/search';
import { TSearchResults } from '../../utils/search/types';
import { useDebounce } from 'use-debounce';
import { useLocation } from '@reach/router';

interface SearchMenuProps {}

/**
 * Search menu component - shows a navigatable list of search results
 */
const SearchMenu: FC<SearchMenuProps> = ({}) => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [navigateIdx, setNavigateIdx] = useState<number>(-1);
  const modalDisclosure = useDisclosure();
  const ref = useRef<{
    searchTimout: NodeJS.Timeout | undefined;
    changedQuery: boolean;
  }>({
    searchTimout: undefined,
    changedQuery: false // We use this to prevent the menu from fetching the default search results on first render since this is already done in the context provider
  });
  const currentUserId = '1';

  const [query] = useDebounce(searchQuery, 500);

  const search = useSearch(query);

  const location = useLocation();

  useEffect(() => {
    // close the modal when the location changes
    modalDisclosure.onClose();
  }, [location]);

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

        onOpen();

        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleGlobalKeydown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeydown);
    };
  }, []);

  /**
   * The search result items to display in the search modal
   */
  // const resultItems = useMemo(() => {
  //   const output: ReactNode[] = [];
  //   let itemIdx = 0;
  //   let sectionIdx = 0;

  //   const haveSomeResults = search.searchResult.length > 0;

  //   if (!haveSomeResults && searchQuery.length > 0) {
  //     return [
  //       <Center
  //         w="full"
  //         my={3}
  //         fontSize="sm"
  //         color="features.search.noResults.text.color"
  //       >
  //         No results found for "
  //         <Text as="span" fontStyle="italic">
  //           {searchQuery}
  //         </Text>
  //         ". Please try another search.
  //       </Center>
  //     ];
  //   }

  //   // Mark the item as highlighted if its index matches the navigateIdx
  //   // if (navigateIdx >= 0) {
  //   //   search.searchResult.forEach(section => {
  //   //     section.sections.find(subSection => {
  //   //       subSection.results.forEach(item => {
  //   //         if (itemIdx++ === navigateIdx) {
  //   //           item.isActive = true;
  //   //           return true;
  //   //         }
  //   //         if (item.isActive) item.isActive = false;
  //   //         return false;
  //   //       });
  //   //       return false;
  //   //     });
  //   //   });
  //   // }
  //   itemIdx = 0; // Reset the item index

  //   for (const key in search.searchResult) {
  //     const isDocs = key === 'docs' && searchQuery.length > 0;
  //     const section =  search.searchResult[key as keyof TSearchResults];
  //     if (haveSomeResults && section.sections.length === 0) continue;
  //     output.push(
  //       <Fragment key={itemIdx}>
  //         {itemIdx > 0 && <Divider />}
  //         <SearchResultSectionTitle
  //           title={section.title}
  //           idx={itemIdx * -1}
  //           color="features.search.section.title.color"
  //           textTransform="none"
  //           {...(!section.icon && {
  //             mb: 5
  //           })}
  //         />
  //         <VStack
  //           spacing={1}
  //           w="full"
  //           textAlign="left"
  //           _last={{
  //             mb: 2
  //           }}
  //           maxH="205px"
  //           overflowY="auto"
  //           className="sd-search-outer-section"
  //         >
  //           {section.sections.map(subSection => (
  //             <SearchResultSection
  //               section={subSection}
  //               idx={itemIdx}
  //               query={searchQuery}
  //               key={itemIdx}
  //               defaultHighlight={itemIdx++ === 0}
  //               icon={section.icon}
  //               isDocs={isDocs}
  //             />
  //           ))}
  //         </VStack>
  //       </Fragment>
  //     );
  //     sectionIdx++;
  //   }
  //   return output;
  // }, [search.searchResult, navigateIdx]);

  useEffect(() => {
    if (navigateIdx >= 0) {
      const item = document.getElementById(`sd-search-ri-${navigateIdx}`);

      if (item) item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [search.searchResult]);

  /**
   * Navigate to the next or previous item in the search results
   * @param isUp Whether to navigate up or down
   */
  const handleNavigate = (isUp: boolean) => {
    const itemsCount = Object.values(search.searchResult)
      .map(chapter => chapter.sections)
      .flat()
      .map(section => section.results)
      .flat().length;

    if (isUp) {
      if (navigateIdx > 0) setNavigateIdx(navigateIdx - 1);
      else setNavigateIdx(itemsCount - 1);
      return;
    }
    if (navigateIdx < itemsCount - 1) setNavigateIdx(navigateIdx + 1);
    else setNavigateIdx(0);
  };

  const data = useMemo(() => {
    let dataItemIdx = 0;

    return Object.values(search.searchResult).map(chapter => {
      return {
        ...chapter,
        sections: chapter.sections.map(section => {
          return {
            ...section,
            results: section.results.map(result => {
              return {
                ...result,
                isActive: dataItemIdx++ === navigateIdx
              };
            })
          };
        })
      };
    });
  }, [search.searchResult, navigateIdx]);

  /**
   * Navigate to the active item's href
   */
  const handleOpenActiveItem = () => {
    const activeItem = data
      .map(chapter => chapter.sections)
      .flat()
      .map(section => section.results)
      .flat()
      .find(item => item.isActive);

    if (activeItem) {
      modalDisclosure.onClose();
      navigate(activeItem.to);
    }
  };

  const onOpen = () => {
    setSearchQuery('');
    modalDisclosure.onOpen();
  };

  const results = useMemo(() => {
    let itemIdx = 0;

    return data.map((chapter, cidx) => {
      return (
        <Fragment key={cidx}>
          {cidx > 0 && <Divider />}
          <SearchResultSectionTitle
            title={chapter.title}
            idx={itemIdx * -1}
            color="features.search.section.title.color"
            textTransform="none"
            {...(!chapter.icon && {
              mb: 5
            })}
            icon={chapter.icon}
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
            {chapter.sections.map((section, sidx) => {
              const el = (
                <SearchResultSection
                  section={section}
                  idx={itemIdx}
                  query={searchQuery}
                  key={sidx}
                  defaultHighlight={itemIdx === 0}
                  icon={chapter.icon}
                  isDocs={!!section.results[0]?.to?.startsWith('/docs/')}
                />
              );

              itemIdx = itemIdx + section.results.length;

              return el;
            })}
          </VStack>
        </Fragment>
      );
    });
  }, [data, navigateIdx]);

  return (
    <ThemeProvider theme={theme}>
      <SearchButton openModal={onOpen} navigate={handleNavigate} />
      <SearchModal
        defaultQuery={searchQuery}
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        isLoading={search.isLoading}
        searchResultItems={results}
        setSearchQuery={setSearchQuery}
        handleNavigate={handleNavigate}
        openActiveItem={handleOpenActiveItem}
      />
    </ThemeProvider>
  );
};

export default SearchMenu;
