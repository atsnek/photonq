import { Field, PageConfig, PageProps } from '@atsnek/jaen';

import { Box } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';

const TestoPage: React.FC<PageProps> = () => {
  return (
    <Box as="main">
      <Field.Text name="welcome" placeholder="Welcome to your Jaen website!" />
    </Box>
  );
};

export default TestoPage;

export const pageConfig: PageConfig = {
  label: 'Testo Page',
  icon: 'FaHome',
  menu: {
    type: 'app'
  }
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
