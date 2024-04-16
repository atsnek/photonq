import { PageConfig, PageProps } from '@atsnek/jaen';

import { Box } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';
import AboutContent from '../contents/AboutContent';

const AboutPage: React.FC<PageProps> = () => {
  return (
    <Box as="main">
      <AboutContent />
    </Box>
  );
};

export default AboutPage;

export const pageConfig: PageConfig = {
  label: 'About page',
  icon: 'FaInfo',
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
