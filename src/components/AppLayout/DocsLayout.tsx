import {
  Box,
  Container,
  Flex,
  LinkProps,
  Text,
  VStack
} from '@chakra-ui/react';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import React, { FC, useMemo, useState } from 'react';
import { useMenuStructureContext } from '../../contexts/menu-structure';
import { TOCProvider } from '../../contexts/toc';
import useNavOffset from '../../hooks/use-nav-offset';
import { createBreadCrumbParts } from '../../utils/navigation';
import { MainBreadcrumbPart } from '../../utils/navigation/types';
import Links from '../Links';
import TbUsers from '../icons/tabler/TbUsers';
import MainBottomNav from '../navigation/MainBottomNav';
import MainBreadcrumb from '../navigation/MainBreadcrumb';
import TableOfContent from '../navigation/TableOfContent';
import PageDirectory from '../navigation/page-directory/PageDirectory';

// The site has no /contact page. The imprint opens with the group's contact
// details, so that is where a question goes.
const links = [
  {
    name: 'Question? Give us feedback',
    href: '/imprint/'
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

  const offset = useNavOffset();

  return (
    <Container maxW="8xl" w="full" minH="full" mt={offset}>
      <Flex minH="100dvh">
        <Box
          as="aside"
          flex="1"
          maxW={{ base: '150px', lg: '2xs' }}
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
              baseMenuItems={[
                {
                  name: 'Community Research',
                  icon: <TbUsers />,
                  items: [
                    {
                      name: 'Experiments',
                      href: '/experiments',
                      isActive: path?.startsWith('/experiments')
                    }
                  ]
                },
                {
                  name: 'More',
                  icon: <FaLink />,
                  items: [
                    {
                      name: 'PhotonQ',
                      href: '/'
                    }
                  ]
                }
              ]}
            />
          </Box>
        </Box>

        {/* <Container maxW="3xl" mt="6">
       
        </Container> */}

        <TOCProvider>
          {isCommunity ? (
            <Box flex="1" mt="6" mx="8">
              {memoedChildren}
            </Box>
          ) : (
            <>
              <Container flex="1" mt="6" maxW="3xl">
                <MainBreadcrumb parts={breadcrumbParts} />

                {memoedChildren}

                <MainBottomNav />
              </Container>
              <Box
                as="aside"
                flex="1"
                maxW={{ base: '150px', lg: '2xs' }}
                display={{
                  base: 'none',
                  md: 'block'
                }}
                pb="4"
              >
                <Box position="sticky" top="100px" mt="50px">
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
                          // This file and pages/docs are the only two
                          // consumers of `right-bottom-nav`, and both select it
                          // from inside this object rather than as a `variant=`
                          // attribute — which is exactly how it nearly got
                          // pruned out of the link recipe. It is back in
                          // styles/theme/recipes.ts and typed by typegen.
                          variant: 'right-bottom-nav' as LinkProps['variant'],
                          w: '100%',
                          display: 'block'
                        }}
                      />
                    </VStack>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </TOCProvider>
      </Flex>
    </Container>
  );
};

export default DocsLayout;
