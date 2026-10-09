import { Field, PageConfig, PageProps } from 'jaen';

import { Container } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';

const TermsOfServicePage: React.FC<PageProps> = () => {
  return (
    // The same 7xl column as the top bar and the footer. With no container
    // the text ran the full width of the window, 24px from either edge on a
    // 1440px screen, under a centred title. `px="0"`, because the editor
    // content brings its own side padding.
    <Container as="main" maxW="7xl" px="0">
      <Field.Editor name="terms-of-service" />
    </Container>
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
