import { Field, PageConfig, PageProps } from '@atsnek/jaen';

import { Box } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';
import TermsOfServiceContent from '../contents/TermsOfServiceContent';

const TermsOfServicePage: React.FC<PageProps> = () => {
  return (
    <Box as="main">
      <TermsOfServiceContent />
    </Box>
  );
};

export default TermsOfServicePage;

export const pageConfig: PageConfig = {
  label: 'TermsOfServicePage page',
  icon: 'FaPassport'
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
