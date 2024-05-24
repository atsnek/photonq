import { Field, PageConfig, PageProps } from '@atsnek/jaen';

import { Box } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';
import PrivacyPolicyContent from '../contents/PrivacyPolicyContent';

const PrivacyPolicyPage: React.FC<PageProps> = () => {
  return (
    <Box as="main">
      <PrivacyPolicyContent />
    </Box>
  );
};

export default PrivacyPolicyPage;

export const pageConfig: PageConfig = {
  label: 'PrivacyPolicy page',
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
