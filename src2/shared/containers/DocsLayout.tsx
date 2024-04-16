import { Box } from '@chakra-ui/react';
import React, { FC, useMemo, useState } from 'react';
import LeftNav from './navigation/LeftNav';
import MainBreadcrumb from './navigation/components/MainBreadcrumb';
import PageDirectory from './navigation/components/page-directory/PageDirectory';
import MainGrid from './components/MainGrid';
import { useMenuContext } from '../contexts/menu';
import { MainBreadcrumbPart } from '../types/navigation';
import { createBreadCrumbParts } from '../utils/navigation';

interface DocsLayoutProps {
  children?: React.ReactNode;
  path?: string;
  isCommunity?: boolean;
}

const DocsLayout: FC<DocsLayoutProps> = ({ children, path, isCommunity }) => {
  const { menuStructure } = useMenuContext();

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

  return (
    <MainGrid isLeftNavExpanded={isExpanded}>
      <Box display={{ base: 'none', md: 'block' }} position="sticky">
        <LeftNav isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
          <Box w={isExpanded ? 'auto' : 0}>
            <PageDirectory data={menuStructure} isExpanded={isExpanded} path={path} />
          </Box>
        </LeftNav>
      </Box>

      <Box minW="full">
        {!isCommunity && (
          <Box overflow="hidden">
            <MainBreadcrumb parts={breadcrumbParts} />
          </Box>
        )}
        <Box>{memoedChildren}</Box>
      </Box>
    </MainGrid>
  );
};

export default DocsLayout;
