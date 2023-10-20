import { HeadingProps, Heading, MenuGroup, MenuDivider } from '@chakra-ui/react';
import { FC } from 'react';
import { TSearchResultSection } from '../../../shared/types/search';
import SearchResultItem from './SearchResultItem';

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
