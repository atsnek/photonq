import {
  HeadingProps,
  Heading,
  MenuGroup,
  MenuDivider,
  HStack,
  Box,
  Divider,
  Icon,
  VStack
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { TSearchResultSection } from '../../../shared/types/search';
import SearchResultItem from './SearchResultItem';

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
      textTransform="uppercase"
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
}> = ({ section, idx, icon, query, defaultHighlight, onItemClickCapture, isDocs }) => {
  return (
    <Box key={idx} w="full">
      {isDocs && (
        <SearchResultItem
          item={{ title: section.title, href: section.results[0].href, description: '' }}
          query={query}
          id={-1}
          icon={icon}
        />
      )}
      {/* <SearchResultSectionTitle title={section.title} idx={idx} icon={icon} /> */}
      {/* <Divider /> */}
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
    </Box>
  );
};
