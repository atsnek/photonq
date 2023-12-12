import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  Flex,
  HStack,
  Image,
  ImageProps,
  LinkProps,
  Spacer,
  StackProps,
  VStack,
  useDisclosure,
  DarkMode,
  LightMode
} from '@chakra-ui/react';
import { useLocation } from '@reach/router';
import { FC, useEffect, useMemo, useState } from 'react';
import SnekIcon from '../../../assets/icons/brand.svg';
import SearchMenu from '../../../features/search/components/SearchMenu';
import HamburgerMenuIcon, {
  THamburgerMenuIconStylerProps
} from '../../components/HamburgerMenuIcon';
import MemoizedLinks from '../../components/MemoizedLink';
import useWindowSize from '../../hooks/use-current-window-size';
import { TTopNavLinkData } from '../../types/navigation';
import MobileNavDrawer from './MobileNavDrawer';
import Link from '../../components/Link';
import { useAuthenticationContext } from '@atsnek/jaen';
import Logo from '../../../gatsby-plugin-jaen/components/Logo';
import useScrollPosition from '../../hooks/use-scroll-position';
import useMobileDetection from '../../hooks/use-mobile-detection';
import ThemeChooser from '../../components/theme-chooser/ThemeChooser';

const navLinkProps = {
  display: { base: 'none', md: 'initial' },
  opacity: 0.8,
  _hover: {
    textDecoration: 'none',
    opacity: 1
  },
  fontSize: 'sm'
};

export type TTopNavLinkProps = LinkProps;
export type TTopNavWrapperProps = BoxProps;
export type TMobileMenuButtonProps = ButtonProps;
export type TBrandImage = { props?: ImageProps; src: string; alt: string };

interface ITopNavProps {
  branding?: {
    image?: TBrandImage;
    colorMode?: 'light' | 'dark';
  };
  wrapperProps?: StackProps;
  linkProps?: LinkProps;
  mobileMenuButtonProps?: ButtonProps;
  hamburgerIconProps?: THamburgerMenuIconStylerProps;
  drawerDisclosure: ReturnType<typeof useDisclosure>;
  colorMode?: 'light' | 'dark';
  showThemeToggle?: boolean;
  children?: React.ReactNode;
}

/**
 * Top navigation bar.
 */
const TopNav: FC<ITopNavProps> = ({
  branding,
  wrapperProps,
  linkProps,
  mobileMenuButtonProps,
  hamburgerIconProps,
  drawerDisclosure,
  colorMode,
  showThemeToggle,
  children
}) => {
  const [hamburgerClass, setHamburgerClass] = useState('');
  const { openLoginModal } = useAuthenticationContext();
  const { isOpen, onOpen, onClose } = drawerDisclosure;

  const location = useLocation();
  const windowSize = useWindowSize();
  const scrollPosition = useScrollPosition();
  const isMobile = useMemo(() => useMobileDetection(), []);
  const isAuthenticated = useAuthenticationContext().user !== null;

  const links: { left: TTopNavLinkData[]; right: TTopNavLinkData[] } = {
    left: [
      {
        name: 'Home',
        href: '/',
        matchMethod: 'exact'
      },
      {
        name: 'Documentation',
        href: '/docs/',
        matchMethod: 'includes'
      },
      {
        name: 'Experiments',
        href: '/experiments/',
        matchMethod: 'includes'
      }
    ],
    right: [
      {
        name: 'Sign In',
        matchMethod: 'exact',
        onClick: openLoginModal
      },
      {
        name: 'Sign Up',
        matchMethod: 'exact',
        href: '/signup',
        style: {
          border: '1px solid',
          borderColor: 'topNav.input.borderColor',
          borderRadius: 'lg',
          h: 9,
          px: 2,
          lineHeight: 9
        }
      }
    ]
  };

  const activatedLinks = useMemo(() => {
    let activeLinkFound = false;
    return links.left.map(link => {
      if (activeLinkFound) return link;
      const isActive =
        link.href && link.matchMethod
          ? link.matchMethod === 'exact'
            ? location.pathname === link.href
            : location.pathname.includes(link.href)
          : false;

      if (isActive) activeLinkFound = true;
      return {
        ...link,
        isActive
      };
    });
  }, [location.pathname]);

  useEffect(() => {
    if (windowSize.width >= 768 && isOpen) closeDrawer();
  }, [windowSize.width]);

  const openDrawer = () => {
    setHamburgerClass('open');
    onOpen();
  };

  const closeDrawer = () => {
    setHamburgerClass('');
    onClose();
  };

  const toggleMobileMenu = () => {
    if (hamburgerClass === 'open') closeDrawer();
    else openDrawer();
  };

  const search = (() => {
    if (!colorMode) return <SearchMenu />;
    if (colorMode === 'dark')
      return (
        <DarkMode>
          <SearchMenu />
        </DarkMode>
      );
    if (colorMode === 'light')
      return (
        <LightMode>
          <SearchMenu />
        </LightMode>
      );
  })();

  return (
    <>
      <Center
        as="nav"
        position="sticky"
        top={0}
        h="64px"
        px={{ base: 5, xl: 0 }}
        borderBottom="1px solid"
        borderBottomColor="topNav.borderColor"
        backgroundColor="shared.translucent.bgColor"
        backdropFilter="blur(10px)"
        zIndex={3}
        {...wrapperProps}
        transition="top 0.2s ease-in-out"
      >
        <VStack w="full" spacing={0}>
          <Flex w="full" maxW="7xl">
            <Link
              h="60px"
              href="/"
              _hover={{
                transform: 'scale(1.1)'
              }}
              transition="transform 0.2s ease-in-out"
            >
              {branding?.image ? (
                <Image
                  h="32px"
                  {...branding.image?.props}
                  src={branding.image?.src ?? SnekIcon}
                  alt={branding.image?.alt ?? 'Snek Logo'}
                />
              ) : (
                <Logo forceColorMode={branding?.colorMode} />
              )}
            </Link>
            <HStack spacing={4} ml={5}>
              <MemoizedLinks
                links={activatedLinks}
                props={{ ...navLinkProps, ...linkProps }}
                activeProps={{
                  opacity: 1,
                  fontWeight: 'semibold',
                  color: 'topNav.links.active.color'
                }}
              />
            </HStack>
            <Spacer />
            <Center>
              <HStack spacing={4}>
                <Box display={{ base: 'none', md: 'initial' }}>{search}</Box>
                <Button
                  variant="ghost-hover"
                  size="sm"
                  display={{ base: 'initial', md: 'none' }}
                  onClick={toggleMobileMenu}
                  {...mobileMenuButtonProps}
                >
                  <HamburgerMenuIcon
                    wrapperProps={{ className: hamburgerClass }}
                    iconProps={hamburgerIconProps}
                  />
                </Button>
              </HStack>
            </Center>
            <Center>
              <HStack spacing={4} ml={4}>
                <MemoizedLinks
                  links={links.right}
                  props={{ ...navLinkProps, ...linkProps }}
                  activeProps={{
                    opacity: 1,
                    fontWeight: 'semibold',
                    color: 'topNav.links.active.color'
                  }}
                />
                {showThemeToggle && !isAuthenticated && !isMobile && (
                  <ThemeChooser
                    buttonProps={{
                      variant: 'outline',
                      color: 'inherit',
                      borderColor: 'topNav.input.borderColor',
                      opacity: 0.4,
                      _hover: { opacity: 1 }
                    }}
                    forceMenuColorMode={colorMode}
                  />
                )}
              </HStack>
            </Center>
          </Flex>
          {children}
        </VStack>
      </Center>
      <MobileNavDrawer isOpen={isOpen} onOpen={onOpen} onClose={closeDrawer} />
    </>
  );
};

export default TopNav;
