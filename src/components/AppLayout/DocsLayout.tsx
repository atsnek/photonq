import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react';
import React, { FC, useMemo, useState } from 'react';
import { useMenuStructureContext } from '../../contexts/menu-structure';
import { createBreadCrumbParts } from '../../utils/navigation';
import { MainBreadcrumbPart } from '../../utils/navigation/types';
import MainGrid from '../MainGrid';
import LeftNav from '../navigation/LeftNav';
import MainBreadcrumb from '../navigation/MainBreadcrumb';
import PageDirectory from '../navigation/page-directory/PageDirectory';
import MdxEditor from '../mdx-editor/MdxEditor';
import MainBottomNav from '../navigation/MainBottomNav';
import TableOfContent from '../navigation/TableOfContent';
import Links from '../Links';
import RightNav from '../navigation/RightNav';
import { TOCProvider, useTOCContext } from '../../contexts/toc';
import useNavOffset from '../../hooks/use-nav-offset';

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

interface DocsLayoutProps {
  children?: React.ReactNode;
  path?: string;
  isCommunity?: boolean;
}

const DocsLayout: FC<DocsLayoutProps> = ({ children, path, isCommunity }) => {
  const { menuStructure } = useMenuStructureContext();

  const [isExpanded, setIsExpanded] = useState(true);

  const breadcrumbParts: MainBreadcrumbPart[] = useMemo(() => {
    return [
      {
        name: 'Documentation',
        isDisabled: path === '/docs/',
        href: '/docs'
      },
      ...createBreadCrumbParts(menuStructure)
    ];
  }, [menuStructure]);

  const memoedChildren = useMemo(() => children, [children]);

  const MemoizedToc = React.memo(TableOfContent, () => false);

  console.log('DocsLayout', path);

  const offset = useNavOffset();

  return (
    <Container maxW="8xl" w="full" minH="full" mt={offset}>
      <Flex minH="100dvh">
        <Box
          as="aside"
          flex="1"
          maxW={{ base: '150px', lg: 'xs' }}
          display={{
            base: 'none',
            md: 'block'
          }}
          pb="4"
        >
          <Box position="sticky" top="100px" mt="50px">
            <PageDirectory
              data={menuStructure}
              isExpanded={isExpanded}
              path={path}
            />
          </Box>
        </Box>

        {/* <Container maxW="3xl" mt="6">
       
        </Container> */}

        <TOCProvider>
          <Box flex="1" mt="6" maxW="3xl" m="4">
            {path?.startsWith('/docs/') && (
              <MainBreadcrumb parts={breadcrumbParts} />
            )}

            {memoedChildren}

            <MainBottomNav />
          </Box>

          {!isCommunity && (
            <Box
              as="aside"
              flex="1"
              maxW={{ base: '150px', lg: 'xs' }}
              display={{
                base: 'none',
                md: 'block'
              }}
              pb="4"
            >
              <Box position="sticky" top="100px" mt="50px">
                <Text
                  color="rightNav.titleTop.color"
                  fontWeight="semibold"
                  fontSize="sm"
                >
                  On This Page
                </Text>
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
              </Box>
            </Box>
          )}
        </TOCProvider>
      </Flex>
    </Container>
  );
};

export default DocsLayout;
