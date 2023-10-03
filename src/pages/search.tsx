import { Field, PageConfig, PageProps } from '@atsnek/jaen';

import { Box, Spinner } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';
import { LandingPageContent } from '../photonq/LandingPageContent';
import { SearchProvider } from '../search/search-provider';
import { useSearch } from '../search/use-search';

const SearchInput: React.FC = () => {
  const { isLoading, searchIndex } = useSearch();

  if (isLoading) {
    return <Spinner />;
  }

  return <pre>{JSON.stringify(searchIndex, null, 2)}</pre>;
};

const IndexPage: React.FC<PageProps> = () => {
  return (
    <SearchProvider>
      <SearchInput />
    </SearchProvider>
  );
};

export default IndexPage;

export const pageConfig: PageConfig = {
  label: 'Search Demo',
  icon: 'FaSearch',
  childTemplates: []
};

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`;

export { Head } from '@atsnek/jaen';
