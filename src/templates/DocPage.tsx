import { PageConfig } from 'jaen';
import { Box, Flex, Stack, Text, VStack } from '@chakra-ui/react';
import { PageProps, graphql } from 'gatsby';
import * as React from 'react';
import TableOfContent from '../components/navigation/TableOfContent';
import useNavOffset from '../hooks/use-nav-offset';
import MdxEditor from '../components/mdx-editor/MdxEditor';
import Links from '../components/Links';
import RightNav from '../components/navigation/RightNav';
import MainBottomNav from '../components/navigation/MainBottomNav';
import { useTOCContext } from '../contexts/toc';

// Example links - these would probably be fetched from a CMS or other data source
const links = [
  {
    name: 'Question? Give us feedback',
    href: '/contact'
  },
  {
    name: 'Edit this page on Jaen',
    href: '/cms/pages'
  }
];

const DocPage: React.FC<PageProps> = props => {
  const toc = useTOCContext();

  return <MdxEditor onMdast={toc.setValue} />;
};

export default DocPage;

export { Head } from 'jaen';

export const pageConfig: PageConfig = {
  label: 'DocPage',
  childTemplates: ['DocPage'],
  withoutJaenFrameStickyHeader: true
};

export const query = graphql`
  query ($jaenPageId: String!) {
    jaenPage(id: { eq: $jaenPageId }) {
      ...JaenPageData
      childPages {
        ...JaenPageChildrenData
      }
    }
  }
`;
