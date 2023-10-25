import React, { FC, ReactNode, useMemo } from 'react';
import TopNav, {
  TBrandImage,
  TMobileMenuButtonProps,
  TTopNavLinkProps,
  TTopNavWrapperProps
} from './navigation/TopNav';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import Footer from './Footer';
import DocsLayout from './DocsLayout';
import { useLocation } from '@reach/router';
import { TSearchMenuStyleProps } from '../../features/search/components/SearchMenu';
import { THamburgerMenuIconStylerProps } from '../components/HamburgerMenuIcon';
import { MenuContext } from '../contexts/menu';
import { useAuthenticationContext, useCMSManagementContext } from '@atsnek/jaen';
import { createPageTree } from '../utils/navigation';
import CommunityLayout from './CommunityLayout';

interface AppLayoutProps {
  children?: React.ReactNode;
  isDocs?: boolean;
  isCommunity?: boolean;
  path?: string;
  footer?: FC;
  customTopNavDisclosure?: ReturnType<typeof useDisclosure>;
  topNavProps?: {
    isVisible?: boolean;
    wrapper?: TTopNavWrapperProps;
    link?: TTopNavLinkProps;
    colorMode?: 'light' | 'dark';
    hamburger?: THamburgerMenuIconStylerProps;
    mobileMenuButtonProps?: TMobileMenuButtonProps;
  };
  branding?: {
    image?: TBrandImage;
    colorMode?: 'light' | 'dark';
  };
}

/**
 * The global layout component.
 * This should not be directly used in pages, but used in gatsby.
 */
const AppLayout: FC<AppLayoutProps> = ({
  children,
  isDocs,
  isCommunity,
  path,
  footer,
  customTopNavDisclosure,
  topNavProps,
  branding
}) => {
  const cmsManager = useCMSManagementContext();
  const location = useLocation();
  const topNavDisclosure = useDisclosure(); // for the top nav mobile drawer
  const { isAuthenticated } = useAuthenticationContext();

  // This generates the menu structure from the page tree that is used over the whole app by accessing the context.
  const menuStructure = useMemo(
    () => createPageTree(cmsManager, location.pathname),
    [cmsManager, path]
  );

  const FooterComp = footer ?? Footer;

  let childrenElmnt: ReactNode = null;

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
      <MenuContext.Provider value={{ menuStructure }}>
        <Flex minW="210px" h="max(100%, 100vh)" minH="100vh" direction="column" pb={5}>
          {!isAuthenticated && topNavProps?.isVisible && (
            <TopNav
              drawerDisclosure={customTopNavDisclosure ?? topNavDisclosure}
              linkProps={topNavProps?.link}
              wrapperProps={topNavProps?.wrapper}
              colorMode={topNavProps?.colorMode}
              hamburgerIconProps={topNavProps?.hamburger}
              mobileMenuButtonProps={topNavProps?.mobileMenuButtonProps}
              branding={branding}
            />
          )}
          <Box flex="1">{childrenElmnt}</Box>
        </Flex>
      </MenuContext.Provider>
      <FooterComp />
    </>
  );
};

export default AppLayout;
