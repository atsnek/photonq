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
import { TSearchResult } from '../../../shared/types/search';
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
    <LinkBox
      as={Flex}
      key={id}
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
    >
      <Box
        display="flex"
        alignItems="center"
        __css={{
          '& svg': {
            stroke: 'features.search.section.item.icon.color',
            verticalAlign: 'middle'
          }
        }}
        w={isDocs ? 'calc(95% - 20px)' : 'calc(95%)'}
      >
        {icon}
        <LinkOverlay
          as={Link}
          to={item.to}
          ml={2}
          _focus={{
            outline: 'none'
          }}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {isDocs ? (
            <Stack spacing="0.5">
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
        </LinkOverlay>
      </Box>
      <Spacer />
      <Text whiteSpace="nowrap" color="features.search.section.item.goto.color">
        Go to
      </Text>
    </LinkBox>
  );
};

export default SearchResultItem;
