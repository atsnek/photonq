import { Field, PageConfig, PageProps } from '@atsnek/jaen';

import { Box } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';
import { LandingPageContent } from '../photonq/LandingPageContent';
import { DocContent } from '../contents/DocContent';

const DocsPage: React.FC<PageProps> = () => {
  return <DocContent />;
};

export default DocsPage;

export const pageConfig: PageConfig = {
  label: 'Docs Page',
  icon: 'FaHome',
  childTemplates: ['DocPage'],
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
