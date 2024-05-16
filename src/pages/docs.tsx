import { PageConfig } from '@atsnek/jaen';
import { Box, Container, Flex, Stack, Text, VStack } from '@chakra-ui/react';
import { PageProps, graphql } from 'gatsby';
import * as React from 'react';
import TableOfContent from '../components/navigation/TableOfContent';
import useNavOffset from '../hooks/use-nav-offset';
import MdxEditor from '../components/mdx-editor/MdxEditor';
import Links from '../components/Links';
import RightNav from '../components/navigation/RightNav';
import MainBottomNav from '../components/navigation/MainBottomNav';

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

const DocsPage: React.FC<PageProps> = () => {
  const navTopOffset = useNavOffset();

  // This can be memoized since it doesn't change and switching pages re-renders most of the app anyway.
  const MemoizedToc = React.memo(TableOfContent, () => false);

  return <MdxEditor />;

  return (
    <>
      <Stack spacing={{ base: 0, xl: 12 }} direction="row">
        <Box w="full" overflow="hidden">
          <MdxEditor />
          <MainBottomNav />
        </Box>

        <Box
          position="sticky"
          top={`calc(0px + ${navTopOffset})`}
          borderLeft="1px solid"
        >
          <RightNav>
            <Flex as="nav" direction="column" mt={5}>
              <MemoizedToc />
            </Flex>
            <Box
              mt={7}
              pt={7}
              borderTop="1px solid"
              borderTopColor="components.separator.borderColor"
              fontSize="xs"
            >
              <VStack rowGap={1} textAlign="left">
                <Links
                  links={links}
                  props={{
                    variant: 'right-bottom-nav',
                    w: '100%',
                    display: 'block'
                  }}
                />
              </VStack>
            </Box>
          </RightNav>
        </Box>
      </Stack>
    </>
  );
};

export default DocsPage;

export const pageConfig: PageConfig = {
  label: 'Documentation',
  icon: 'FaBook',
  childTemplates: ['DocPage'],
  withoutJaenFrameStickyHeader: true,
  menu: {
    type: 'app',
    order: 100,
    group: 'photonq'
  }
};

export const query = graphql`
  query ($jaenPageId: String!) {
    jaenPage(id: { eq: $jaenPageId }) {
      ...JaenPageData
    }
    allJaenPage(filter: { id: { eq: "JaenPage /docs/" } }) {
      nodes {
        id
        childPages {
          ...JaenPageChildrenData
        }
      }
    }
  }
`;

export { Head } from '@atsnek/jaen';
