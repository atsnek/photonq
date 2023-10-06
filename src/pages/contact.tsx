import { PageConfig, PageProps } from '@atsnek/jaen';

import { Box } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';
import ContactContent from '../contents/ContactContent';

const ContactPage: React.FC<PageProps> = () => {
  return (
    <Box as="main">
      <ContactContent />
    </Box>
  );
};

export default ContactPage;

export const pageConfig: PageConfig = {
  label: 'Contact page',
  icon: 'FaPhone',
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
