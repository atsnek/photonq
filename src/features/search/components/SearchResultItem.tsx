import { MenuItemProps, LinkBox, LinkOverlay, Text, Box, Spacer, Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { TSearchResult } from '../../../shared/types/search';
import Highlighter from 'react-highlight-words';

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
}> = ({ item, query, id, defaultFocus = false, onClickCapture = undefined, icon, isDocs }) => {
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
    <LinkBox
      as={Flex}
      w={isDocs ? 'calc(100% - 20px)' : 'full'}
      key={id}
      _hover={{
        bgColor: 'features.search.section.item._hover.bgColor',
        color: 'features.search.section.item._hover.color'
      }}
      px={2}
      py={2}
      ml={isDocs ? 5 : 0}
      borderRadius="md"
      alignItems="center"
      transition="background-color 0.2s ease-in-out"
      _focusWithin={{
        bgColor: 'features.search.section.item._hover.bgColor',
        color: 'features.search.section.item._hover.color'
      }}
      {...(item.isActive && {
        bgColor: 'features.search.section.item._hover.bgColor'
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
          href={item.href}
          ml={2}
          _focus={{
            outline: 'none'
          }}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {isDocs ? (
            <Highlighter
              searchWords={queryTokens}
              textToHighlight={item.title ?? ''}
              highlightTag={highlightTag}
            />
          ) : (
            item.title
          )}
        </LinkOverlay>
      </Box>
      <Spacer />
      <Text color="features.search.section.item.goto.color">Go to</Text>
    </LinkBox>
  );

  // return (
  //   <Box
  //     as={LinkBox}
  //     key={id}
  //     fontWeight="normal"
  //     _focus={{
  //       '.chakra-heading': {
  //         color: 'components.menu.item.focus.headingColor'
  //       },
  //       '& img': {
  //         transform: 'scale(1.05)'
  //       },
  //       outline: 'none',
  //       border: '0px',
  //       bgColor: 'components.menu.item.focus.bgColor'
  //     }}
  //     _hover={{
  //       '.chakra-heading': {
  //         color: 'components.menu.item.focus.headingColor'
  //       },
  //       bgColor: 'components.menu.item.focus.bgColor'
  //     }}
  //     onKeyDownCapture={e => {
  //       if (e.key === 'Enter') {
  //         // Redirect to the item's link if the user presses enter
  //         navigate(item.href);
  //       }
  //     }}
  //     onClickCapture={onClickCapture}
  //     {...props}
  //     transition="background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
  //   >
  //     <LinkOverlay
  //       as={Link}
  //       href={item.href}
  //       _hover={{
  //         '& img': {
  //           transform: 'scale(1.05)'
  //         }
  //       }}
  //     >
  //       <HStack spacing={3}>
  //         {item.avatarURL && (
  //           <Image
  //             borderRadius="md"
  //             boxSize="40px"
  //             src={item.avatarURL}
  //             transition="transform 0.2s ease-in-out"
  //           />
  //         )}
  //         <Box>
  //           <Heading
  //             size="sm"
  //             transition="color 0.2s ease-in-out"
  //             color={
  //               defaultFocus ? 'components.menu.item.focus.headingColor' : 'shared.text.bright'
  //             }
  //           >
  //             <Highlighter
  //               searchWords={queryTokens}
  //               textToHighlight={item.title ?? ''}
  //               highlightTag={highlightTag}
  //             />
  //           </Heading>
  //           <Text color="text.default">
  //             <Highlighter
  //               searchWords={queryTokens}
  //               textToHighlight={item.description ?? ''}
  //               highlightTag={highlightTag}
  //             />
  //           </Text>
  //         </Box>
  //       </HStack>
  //     </LinkOverlay>
  //   </Box>
  // );
};

export default SearchResultItem;
