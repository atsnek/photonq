import {
  MenuItemProps,
  MenuItem,
  LinkBox,
  LinkOverlay,
  Heading,
  Text,
  HStack,
  Image,
  Box
} from '@chakra-ui/react';
import { navigate, Link } from 'gatsby';
import { FC } from 'react';
import Highlighter from 'react-highlight-words';
import { TSearchResult } from '../../../shared/types/search';

/**
 * The search menu item component for displaying a specific search result item.
 */
export const SearchResultItem: FC<{
  item: TSearchResult;
  query: string;
  id: number;
  defaultFocus?: boolean;
  onClickCapture?: () => void;
}> = ({ item, query, id, defaultFocus = false, onClickCapture = undefined }) => {
  let props: MenuItemProps = {};

  if (defaultFocus) {
    props = {
      ...props,
      bgColor: 'components.menu.item.focus.bgColor'
    };
  }

  const queryTokens = query.split(' ').filter(token => /\S/.test(token));
  const highlightTag = ({ children }: any) => (
    <Text as="span" color="components.menu.item.highlight" children={children} />
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
        '& img': {
          transform: 'scale(1.05)'
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
      <LinkOverlay
        as={Link}
        href={item.href}
        _hover={{
          '& img': {
            transform: 'scale(1.05)'
          }
        }}
      >
        <HStack spacing={3}>
          {item.avatarURL && (
            <Image
              borderRadius="md"
              boxSize="40px"
              src={item.avatarURL}
              transition="transform 0.2s ease-in-out"
            />
          )}
          <Box>
            <Heading
              size="sm"
              transition="color 0.2s ease-in-out"
              color={
                defaultFocus ? 'components.menu.item.focus.headingColor' : 'shared.text.bright'
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
          </Box>
        </HStack>
      </LinkOverlay>
    </MenuItem>
  );
};

export default SearchResultItem;
