import {
  Box,
  Center,
  Menu,
  MenuList,
  MenuListProps,
  MenuProps,
  Portal,
  ThemeProvider
} from '@chakra-ui/react';
import { FC, Fragment, ReactNode, useEffect, useMemo, useState } from 'react';

import { TSearchResults } from '../../../shared/types/search';
import SearchInput, { TSearchInputStyleProps } from './SearchInput';
import { navigate } from '@reach/router';
import { searchDocs, searchSocialPosts, searchUser } from '../../../shared/utils/search';
import { SearchProvider } from '../../../search/search-provider';
import { useSearch } from '../../../search/use-search';
import theme from '../../../styles/theme/theme';
import { SearchResultSection, SearchResultSectionTitle } from './SearchResultSection';

export type TSearchMenuStyleProps = {
  input?: TSearchInputStyleProps;
  menu?: Partial<MenuProps>;
  menuList?: MenuListProps;
};

interface SearchMenuProps {
  onItemClickCapture?: () => void;
  styleProps?: TSearchMenuStyleProps;
}

/**
 * Search menu component - shows a navigatable list of search results
 */
const SearchMenu: FC<SearchMenuProps> = ({ onItemClickCapture, styleProps }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultData, setSearchResultData] = useState<TSearchResults>({});
  const [isAnyItemFocused, setIsAnyItemFocused] = useState(false);
  const resultItems = useMemo(() => {
    const output: ReactNode[] = [];
    let itemIdx = 0;

    for (const key in searchResultData) {
      const section = searchResultData[key as keyof TSearchResults];
      if (section.sections.length === 0) continue;
      output.push(
        <Fragment key={itemIdx}>
          <SearchResultSectionTitle title={section.title} idx={itemIdx++} color="theme.500" />
          {section.sections.map((section, i) => (
            <SearchResultSection
              section={section}
              idx={itemIdx}
              query={searchQuery}
              key={itemIdx}
              defaultHighlight={itemIdx++ === 0 && !isAnyItemFocused}
              onItemClickCapture={onItemClickCapture}
            />
          ))}
        </Fragment>
      );
    }
    if (output.length > 0) return output;

    return (
      <Center my={5} color="components.menu.noResults.color">
        No results found.
      </Center>
    );
  }, [searchResultData, isAnyItemFocused]);

  // Open the first link if the user presses enter (the search input is not focused at this point)
  const openFirstLink = () => {
    for (const key in searchResultData) {
      const section = searchResultData[key as keyof TSearchResults];
      if (section.sections.length > 0) {
        navigate(section.sections[0].results[0].href);
        setIsAnyItemFocused(false);
        return;
      }
    }
    // if (
    //   (searchResultData.docs.length > 0 || searchResultData.community.length > 0) &&
    //   (searchResultData.docs[0]?.results.length > 0 ||
    //     searchResultData.community[0]?.results.length > 0)
    // ) {
    //   const href = (searchResultData.docs[0] ?? searchResultData.community[0]).results[0].href;
    //   navigate(href);
    //   setIsAnyItemFocused(false);
    // }
  };

  const search = useSearch();

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Retrieve the search data
      fetchSearchResults();
    } else setSearchResultData({});
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    const docsResults = await searchDocs(searchQuery, search.searchIndex);
    const socialPostResults = searchQuery.length >= 3 ? await searchSocialPosts(searchQuery) : [];
    const userResult = await searchUser(searchQuery);

    setSearchResultData({
      docs: { title: 'Documentation', sections: docsResults },
      community: { title: 'Community Posts', sections: socialPostResults },
      user: { title: 'Users', sections: userResult }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Menu
        variant="search-result"
        {...styleProps?.menu}
        autoSelect={false}
        onClose={() => {
          setIsAnyItemFocused(false);
        }}
        isLazy
        id="search-menu"
      >
        <SearchProvider>
          <SearchInput
            setSearchQuery={setSearchQuery}
            openFirstLink={openFirstLink}
            styleProps={styleProps?.input}
          />
        </SearchProvider>

        <Portal>
          <Box
            __css={{
              '.sd-search-menu-list::-webkit-scrollbar-thumb': {
                borderRadius: 'full',
                backgroundColor: 'shared.scrollbar.thumb.bgColor',
                '&:hover': {
                  backgroundColor: 'shared.scrollbar.thumb.hover.bgColor'
                }
              },
              '.sd-search-menu-list::-webkit-scrollbar': {
                width: '4px',
                backgroundColor: 'transparent'
              }
            }}
          >
            <MenuList
              className="sd-search-menu-list"
              style={{
                scrollbarColor: 'red'
              }}
              fontSize="sm"
              backgroundColor="shared.translucent.bgColor"
              backdropBlur={8}
              h="50%"
              height="auto"
              maxHeight="xs"
              overflowY="scroll"
              {...styleProps?.menuList}
              onFocusCapture={e => {
                // If the user focuses on any result item for the first time, set the isAnyItemFocused state to true
                if (!isAnyItemFocused && e.target.classList.contains('chakra-menu__menuitem')) {
                  setIsAnyItemFocused(true);
                }
                //TODO: This 1) scrolls the page too for some reason and 2) scrolls too if the user uses only the mouse for navigating the menu
                // This looks for the first parent element that is the menu group and scrolls to it
                // let currentParent: HTMLElement | null = e.target.parentElement;
                // let safetyIdx = 0;
                // while (
                //   !currentParent?.classList.contains('chakra-portal') &&
                //   safetyIdx < 10
                // ) {
                //   if (currentParent?.classList.contains('chakra-menu__group')) {
                //     currentParent.scrollIntoView({
                //       behavior: 'smooth'
                //     });
                //     break;
                //   }
                //   safetyIdx++; // Prevent infinite loops
                // }
              }}
            >
              {resultItems}
            </MenuList>
          </Box>
        </Portal>
      </Menu>
    </ThemeProvider>
  );
};

export default SearchMenu;
