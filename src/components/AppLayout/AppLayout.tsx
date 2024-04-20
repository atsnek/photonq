import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import React, { FC, ReactNode, useMemo } from 'react';
import TopNav from '../navigation/TopNav';

import { useAuth, useCMSManagementContext } from '@atsnek/jaen';
import { useLocation } from '@reach/router';
import { MenuStructureContext } from '../../contexts/menu-structure';
import { createPageTree } from '../../utils/navigation';
import CommunityLayout from './CommunityLayout';
import DocsLayout from './DocsLayout';
import Footer from './Footer';

interface AppLayoutProps {
  children?: React.ReactNode;
  isDocs?: boolean;
  path: string;
  footer?: FC;
}

/**
 * The global layout component.
 * This should not be directly used in pages, but used in gatsby.
 */
const AppLayout: FC<AppLayoutProps> = ({ children, isDocs, path, footer }) => {
  const cmsManager = useCMSManagementContext();
  const location = useLocation();
  const topNavDisclosure = useDisclosure(); // for the top nav mobile drawer
  const { isAuthenticated } = useAuth();
  const currentUserId = '1';

  // This generates the menu structure from the page tree that is used over the whole app by accessing the context.
  const menuStructure = useMemo(
    () => createPageTree(cmsManager, location.pathname),
    [cmsManager, path]
  );

  const FooterComp = footer ?? Footer;

  let childrenElmnt: ReactNode = null;

  const isCommunity = ['/experiments', '/experiments/'].includes(path);

  if (isDocs) {
    childrenElmnt = (
      <DocsLayout path={path} isCommunity={isCommunity}>
        {children}
      </DocsLayout>
    );
  } else if (isCommunity) {
    childrenElmnt = <CommunityLayout>{children}</CommunityLayout>;
  } else {
    childrenElmnt = children;
  }

  return (
    <>
      <MenuStructureContext.Provider value={{ menuStructure }}>
        <Flex minW="210px" direction="column" pb={5}>
          {!isAuthenticated && <TopNav path={path} />}
          <Box flex="1">{childrenElmnt}</Box>
        </Flex>
      </MenuStructureContext.Provider>
      <FooterComp />
    </>
  );
};

export default AppLayout;
