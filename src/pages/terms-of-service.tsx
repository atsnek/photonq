import { Field, PageConfig, PageProps } from 'jaen';

import { Box } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';

const TermsOfServicePage: React.FC<PageProps> = () => {
  return (
    <Box as="main">
      <Field.Editor name="terms-of-service" />
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

export { Head } from 'jaen';
