import {
  MenuItemProps,
  LinkBox,
  LinkOverlay,
  Text,
  Box,
  Spacer,
  Flex,
  Stack
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { TSearchResult } from '../../utils/search/types';
import Highlighter from 'react-highlight-words';
import { Link } from 'gatsby-plugin-jaen';

/**
 * The search menu item component for displaying a specific search result item.
 */
export const SearchResultItem: FC<{
  id: number;
  item: TSearchResult;
  query: string;
  defaultFocus?: boolean;
  onClickCapture?: () => void;
  icon?: ReactNode;
  isDocs?: boolean;
}> = ({
  item,
  query,
  id,
  defaultFocus = false,
  onClickCapture = undefined,
  icon,
  isDocs
}) => {
  // Nothing spreads `props` onto the markup below, so the defaultFocus
  // background never reached the DOM in v2 either. Left dead rather than
  // wired up, because wiring it up would change how the list looks. The
  // Omit is what keeps the empty literal legal: v3 made `value` required.
  let props: Omit<MenuItemProps, 'value'> = {};

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
    <LinkBox
      id={`sd-search-ri-${id}`}
      _hover={{
        bgColor: 'features.search.section.item._hover.bgColor',
        color: 'features.search.section.item._hover.color'
      }}
      px={2}
      py={2}
      // ml={isDocs ? 5 : 0}
      borderRadius="md"
      alignItems="center"
      transition="background-color 0.2s ease-in-out"
      _focusWithin={{
        bgColor: 'features.search.section.item._hover.bgColor',
        color: 'features.search.section.item._hover.color'
      }}
      {...(item.isActive && {
        bgColor: 'features.search.section.item._hover.bgColor',
        color: 'features.search.section.item._hover.color'
      })}
      asChild
    >
      <Flex key={id}>
        <Box
          display="flex"
          alignItems="center"
          css={{
            // One ampersand: emotion expands each `&` to this element's own
            // class, so `& & svg` was `.css-x .css-x svg` and never matched.
            '& svg': {
              stroke: 'features.search.section.item.icon.color',
              verticalAlign: 'middle'
            }
          }}
          w={isDocs ? 'calc(95% - 20px)' : 'calc(95%)'}
        >
          {icon}
          <LinkOverlay
            ml={2}
            _focus={{
              outline: 'none'
            }}
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            asChild
          >
            <Link to={item.to}>
              {isDocs ? (
                <Stack gap="0.5">
                  <Text
                    fontSize="sm"
                    color="features.search.section.item.title.color"
                    fontWeight="bold"
                  >
                    <Highlighter
                      searchWords={queryTokens}
                      autoEscape
                      textToHighlight={item.title}
                      highlightTag={highlightTag}
                    />
                  </Text>
                  {item.description && (
                    <Text
                      fontSize="sm"
                      color="features.search.section.item.description.color"
                    >
                      <Highlighter
                        searchWords={queryTokens}
                        autoEscape
                        textToHighlight={item.description}
                        highlightTag={highlightTag}
                      />
                    </Text>
                  )}
                </Stack>
              ) : (
                item.title || item.description
              )}
            </Link>
          </LinkOverlay>
        </Box>
        <Spacer />
        <Text
          whiteSpace="nowrap"
          color="features.search.section.item.goto.color"
        >
          Go to
        </Text>
      </Flex>
    </LinkBox>
  );
};

export default SearchResultItem;
