import {
  Box,
  Center,
  Heading,
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
  Text
} from '@chakra-ui/react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import {
  TSearchResult,
  TSearchResultSection
} from '../../../shared/types/search';
import SearchInput, { TSearchInputStyleProps } from './SearchInput';
import Link from '../../../shared/components/Link';
import Highlighter from 'react-highlight-words';
import { useLocation, navigate } from '@reach/router';
// import { SearchProvider, useSearch } from '@atsnek/jaen';
import { searchDocs } from '../../../shared/utils/search';
import { SearchProvider } from '../../../search/search-provider';
import { useSearch } from '../../../search/use-search';

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
      <LinkOverlay href={item.href}>
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
      <Heading
        key={-1}
        fontSize="12px"
        mb={2}
        mt={idx === 0 ? 2 : 5}
        textTransform="uppercase"
        color="components.menu.groupTitle.color"
      >
        {section.title}
      </Heading>
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
  const [searchResultData, setSearchResultData] = useState<
    TSearchResultSection[]
  >([]);
  const [isAnyItemFocused, setIsAnyItemFocused] = useState(false);
  const resultItems = useMemo(() => {
    if (searchResultData.length > 0) {
      return searchResultData.map((section, idx) => (
        <SearchResultSection
          section={section}
          idx={idx}
          query={searchQuery}
          key={idx}
          defaultHighlight={idx === 0 && !isAnyItemFocused}
          onItemClickCapture={onItemClickCapture}
        />
      ));
    }
    return (
      <Center my={5} color="components.menu.noResults.color">
        No results found.
      </Center>
    );
  }, [searchResultData, isAnyItemFocused]);

  // Open the first link if the user presses enter (the search input is not focused at this point)
  const openFirstLink = () => {
    if (
      searchResultData.length > 0 &&
      searchResultData[0]?.results.length > 0
    ) {
      const href = searchResultData[0].results[0].href;
      navigate(href);
      setIsAnyItemFocused(false);
    }
  };

  const search = useSearch();

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Retrieve the search data
      searchDocs(searchQuery, search.searchIndex).then(setSearchResultData);
    } else setSearchResultData([]);
  }, [searchQuery]);

  return (
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
              if (!isAnyItemFocused && e.target instanceof HTMLButtonElement)
                setIsAnyItemFocused(true);
            }}
          >
            {resultItems}
          </MenuList>
        </Box>
      </Portal>
    </Menu>
  );
};

export default SearchMenu;
