import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react';
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
                  name: 'Research',
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
                      variant: 'right-bottom-nav',
                      w: '100%',
                      display: 'block'
                    }}
                  />
                </VStack>
              </Box>
            </Box>
          </Box>
        </TOCProvider>
      </Flex>
    </Container>
  );
};

export default DocsLayout;
