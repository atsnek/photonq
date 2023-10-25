import {
  Box,
  Center,
  Heading,
  HeadingProps,
  InputProps,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemProps,
  MenuList,
  MenuListProps,
  MenuProps,
  Portal,
  Text,
  ThemeProvider
} from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import {
  TSearchResult,
  TSearchResultSection,
  TSearchResults
} from '../../../shared/types/search';
import SearchInput, { TSearchInputStyleProps } from './SearchInput';
import Link from '../../../shared/components/Link';
import Highlighter from 'react-highlight-words';
import { useLocation, navigate } from '@reach/router';
// import { SearchProvider, useSearch } from '@atsnek/jaen';
import { searchDocs, searchSocialPosts } from '../../../shared/utils/search';
import { SearchProvider } from '../../../search/search-provider';
import { useSearch } from '../../../search/use-search';
import theme from '../../../styles/theme/theme';

/**
 * The search menu item component for displaying a specific search result item.
 */
export const SearchResultItem: FC<{
  item: TSearchResult;
  query: string;
  id: number;
  defaultFocus?: boolean;
  onClickCapture?: () => void;
}> = ({
  item,
  query,
  id,
  defaultFocus = false,
  onClickCapture = undefined
}) => {
  let props: MenuItemProps = {};

  if (defaultFocus) {
    props = {
      ...props,
      bgColor: 'components.menu.item.focus.bgColor'
    };
  }

  const queryTokens = query.split(' ').filter(token => /\S/.test(token));
  const highlightTag = ({ children }: any) => (
    <Text
      as="span"
      color="components.menu.item.highlight"
      children={children}
    />
  );

  return (
    <MenuItem
      as={LinkBox}
      key={id}
      fontWeight="normal"
      _focus={{
        '.chakra-heading': {
          color: 'components.menu.item.focus.headingColor'
        },
        outline: 'none',
        border: '0px',
        bgColor: 'components.menu.item.focus.bgColor'
      }}
      _hover={{
        '.chakra-heading': {
          color: 'components.menu.item.focus.headingColor'
        },
        bgColor: 'components.menu.item.focus.bgColor'
      }}
      onKeyDownCapture={e => {
        if (e.key === 'Enter') {
          // Redirect to the item's link if the user presses enter
          navigate(item.href);
        }
      }}
      onClickCapture={onClickCapture}
      {...props}
      transition="background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
    >
      <LinkOverlay as={Link} href={item.href}>
        <Heading
          size="sm"
          transition="color 0.2s ease-in-out"
          color={
            defaultFocus
              ? 'components.menu.item.focus.headingColor'
              : 'shared.text.bright'
          }
        >
          <Highlighter
            searchWords={queryTokens}
            textToHighlight={item.title ?? ''}
            highlightTag={highlightTag}
          />
        </Heading>
        <Text color="text.default">
          <Highlighter
            searchWords={queryTokens}
            textToHighlight={item.description ?? ''}
            highlightTag={highlightTag}
          />
        </Text>
      </LinkOverlay>
    </MenuItem>
  );
};

/**
 * The search menu section title component for displaying a search result section title.
 */
export const SearchResultSectionTitle: FC<
  HeadingProps & {
    title: string;
    idx: number;
  }
> = ({ title, idx, ...props }) => {
  return (
    <Heading
      key={-1}
      fontSize="12px"
      mb={2}
      mt={idx === 0 ? 2 : 5}
      textTransform="uppercase"
      color="components.menu.groupTitle.color"
      {...props}
    >
      {title}
    </Heading>
  );
};

/**
 * The search menu section component for displaying a search result section containing multiple search result items.
 */
export const SearchResultSection: FC<{
  section: TSearchResultSection;
  idx: number;
  query: string;
  defaultHighlight?: boolean;
  onItemClickCapture?: () => void;
}> = ({ section, idx, query, defaultHighlight, onItemClickCapture }) => {
  return (
    <MenuGroup key={idx}>
      <SearchResultSectionTitle title={section.title} idx={idx} />
      <MenuDivider />
      {section.results.map((result, i) => (
        <SearchResultItem
          item={result}
          query={query}
          id={i}
          key={i}
          defaultFocus={defaultHighlight && i === 0}
          onClickCapture={onItemClickCapture}
        />
      ))}
    </MenuGroup>
  );
};

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
const SearchMenu: FC<SearchMenuProps> = ({
  onItemClickCapture,
  styleProps
}) => {
  const r = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultData, setSearchResultData] = useState<TSearchResults>({
    docs: [],
    community: []
  });
  const [isAnyItemFocused, setIsAnyItemFocused] = useState(false);
  const resultItems = useMemo(() => {
    const output: ReactNode[] = [];
    let itemIdx = 0;
    if (searchResultData.docs.length > 0) {
      output.push(
        searchResultData.docs.map(section => (
          <SearchResultSection
            section={section}
            idx={itemIdx}
            query={searchQuery}
            key={itemIdx}
            defaultHighlight={itemIdx++ === 0 && !isAnyItemFocused}
            onItemClickCapture={onItemClickCapture}
          />
        ))
      );
    }
    if (searchResultData.community.length > 0) {
      output.push(
        <SearchResultSectionTitle
          title="Community Posts"
          idx={itemIdx++}
          color="theme.500"
        />,
        searchResultData.community.map(section => (
          <SearchResultSection
            section={section}
            idx={itemIdx}
            query={searchQuery}
            key={itemIdx}
            defaultHighlight={itemIdx++ === 0 && !isAnyItemFocused}
            onItemClickCapture={onItemClickCapture}
          />
        ))
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
    if (
      (searchResultData.docs.length > 0 ||
        searchResultData.community.length > 0) &&
      (searchResultData.docs[0]?.results.length > 0 ||
        searchResultData.community[0]?.results.length > 0)
    ) {
      const href = (searchResultData.docs[0] ?? searchResultData.community[0])
        .results[0].href;
      navigate(href);
      setIsAnyItemFocused(false);
    }
  };

  const search = useSearch();

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Retrieve the search data
      fetchSearchResults();
    } else setSearchResultData({ docs: [], community: [] });
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    const docsResults = await searchDocs(searchQuery, search.searchIndex);
    const socialPostResults = await searchSocialPosts(searchQuery);

    setSearchResultData({ docs: docsResults, community: socialPostResults });
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
                if (
                  !isAnyItemFocused &&
                  e.target.classList.contains('chakra-menu__menuitem')
                ) {
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
