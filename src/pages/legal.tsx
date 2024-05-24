import { Field, PageConfig, PageProps } from '@atsnek/jaen';

import { Box } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';
import LegalContent from '../contents/LegalContent';

const ImprintPage: React.FC<PageProps> = () => {
  return (
    <Box as="main">
      <LegalContent />
    </Box>
  );
};

export default ImprintPage;

export const pageConfig: PageConfig = {
  label: 'Imprint page',
  icon: 'FaPassport',
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
