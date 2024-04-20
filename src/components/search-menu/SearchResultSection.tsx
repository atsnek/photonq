import {
  HeadingProps,
  Heading,
  MenuGroup,
  MenuDivider,
  HStack,
  Box,
  Divider,
  Icon,
  VStack,
  UnorderedList,
  ListItem,
  Stack
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import SearchResultItem from './SearchResultItem';
import { TSearchResultSection } from '../../utils/search/types';
import TbBooks from '../icons/tabler/TbBooks';
import TbBookOff from '../icons/tabler/TbBookOff';
import { FaBook } from '@react-icons/all-files/fa/FaBook';

/**
 * The search menu section title component for displaying a search result section title.
 */
export const SearchResultSectionTitle: FC<
  HeadingProps & {
    title: string;
    idx: number;
    icon?: ReactNode;
  }
> = ({ title, idx, icon, ...props }) => {
  const heading = (
    <Heading
      key={-1}
      fontSize="12px"
      {...(!icon && {
        mb: 2,
        mt: idx === 0 ? 2 : 5
      })}
      color="components.menu.groupTitle.color"
      {...props}
    >
      {title}
    </Heading>
  );

  if (icon) {
    return (
      <HStack
        mb={2}
        mt={idx === 0 ? 2 : 5}
        __css={{
          '& svg': {
            stroke: props.color ?? 'components.menu.groupTitle.color'
          }
        }}
      >
        {heading}
        {icon}
      </HStack>
    );
  }
  return heading;
};

/**
 * The search menu section component for displaying a search result section containing multiple search result items.
 */
export const SearchResultSection: FC<{
  section: TSearchResultSection;
  icon?: ReactNode;
  idx: number;
  query: string;
  defaultHighlight?: boolean;
  onItemClickCapture?: () => void;
  isDocs?: boolean;
}> = ({
  section,
  idx,
  icon,
  query,
  defaultHighlight,
  onItemClickCapture,
  isDocs
}) => {
  const pageToWithoutHash = (page: string) => {
    const hashIndex = page.indexOf('#');
    return hashIndex === -1 ? page : page.slice(0, hashIndex);
  };

  return (
    <Stack key={idx} w="full" spacing="1">
      {isDocs && (
        <SearchResultItem
          item={{
            title: section.title,
            to: section.results?.[0]?.to
              ? pageToWithoutHash(section.results?.[0]?.to)
              : '',
            description: ''
          }}
          query={query}
          id={-1}
          icon={<FaBook />}
        />
      )}
      {/* <SearchResultSectionTitle title={section.title} idx={idx} icon={icon} /> */}
      {/* <Divider /> */}
      <UnorderedList listStyleType="none" ml={isDocs ? 4 : 0}>
        <ListItem>
          {section.results.map((result, i) => (
            <SearchResultItem
              item={result}
              query={query}
              id={idx + i}
              key={i}
              defaultFocus={defaultHighlight && i === 0}
              onClickCapture={onItemClickCapture}
              icon={section.resultIcon ?? icon}
              isDocs={isDocs}
            />
          ))}
        </ListItem>
      </UnorderedList>
    </Stack>
  );
};
