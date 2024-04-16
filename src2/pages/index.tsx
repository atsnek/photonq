import { Field, PageConfig, PageProps } from '@atsnek/jaen';

import { Box } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';
import { LandingPageContent } from '../photonq/LandingPageContent';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Box as="main">
      <LandingPageContent />
    </Box>
  );
};

export default IndexPage;

export const pageConfig: PageConfig = {
  label: 'Home Page',
  icon: 'FaHome',
  childTemplates: ['BlogPage']
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
