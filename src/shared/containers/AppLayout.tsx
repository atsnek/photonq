import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';
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
import { THamburgerMenuIconStylerProps } from '../components/HamburgerMenuIcon';
import { MenuContext } from '../contexts/menu';
import { useAuthenticationContext, useCMSManagementContext } from '@atsnek/jaen';
import { createPageTree } from '../utils/navigation';
import CommunityLayout from './CommunityLayout';
import { SearchContext } from '../contexts/search';
import { TSearchResultSection, TSearchResults } from '../types/search';
import {
  getDefaultSearchDocs,
  getDefaultSearchUsers,
  searchDocs,
  searchSocialPosts,
  searchUser
} from '../utils/search';
import search from '../../pages/search';
import TbBook from '../components/icons/tabler/TbBook';
import TbBooks from '../components/icons/tabler/TbBooks';
import TbUser from '../components/icons/tabler/TbUser';
import { useSearch } from '../../search/use-search';
import { SearchIndex } from '../../search/types';

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
  const currentUserId = useAuthenticationContext().user?.id;

  const search = useSearch();
  const [searchData, setSearchData] = useState<TSearchResults>({});

  useEffect(() => {
    if (!isAuthenticated) fetchDefaultSearchResults();
  }, []);

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

  const fetchDefaultSearchResults = async () => {
    const userResults: TSearchResultSection[] = currentUserId
      ? await getDefaultSearchUsers(currentUserId)
      : [
          {
            title: 'users',
            results: [{ title: 'Create an account', href: '/signup', description: '' }]
          }
        ];
    const docsResults = await getDefaultSearchDocs(search.searchIndex);
    const socialPostResults = await searchSocialPosts();

    setSearchData({
      docs: { title: 'Documentation', sections: docsResults, icon: <TbBooks /> },
      community: { title: 'Community Posts', sections: socialPostResults, icon: <TbBook /> },
      user: { title: 'Users', sections: userResults, icon: <TbUser /> }
    });
  };

  return (
    <SearchContext.Provider value={{ data: searchData, setSearchData }}>
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
    </SearchContext.Provider>
  );
};

export default AppLayout;
