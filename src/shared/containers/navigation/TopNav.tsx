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
  useColorMode
} from '@chakra-ui/react';
import { useLocation } from '@reach/router';
import { FC, useEffect, useMemo, useState } from 'react';
import SnekIcon from '../../../assets/icons/brand.svg';
import SearchMenu, {
  TSearchMenuStyleProps
} from '../../../features/search/components/SearchMenu';
import HamburgerMenuIcon, {
  THamburgerMenuIconStylerProps
} from '../../components/HamburgerMenuIcon';
import MemoizedLinks from '../../components/MemoizedLink';
import GitHub from '../../components/icons/brands/GitHub';
import useWindowSize from '../../hooks/use-current-window-size';
import { useNavOffset } from '../../hooks/use-nav-offset';
import { TTopNavLinkData } from '../../types/navigation';
import MobileNavDrawer from './MobileNavDrawer';
import Link from '../../components/Link';
import { useAuthenticationContext } from '@atsnek/jaen';
import Logo from '../../../gatsby-plugin-jaen/components/Logo';

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
  searchProps?: TSearchMenuStyleProps;
  mobileMenuButtonProps?: ButtonProps;
  hamburgerIconProps?: THamburgerMenuIconStylerProps;
  drawerDisclosure: ReturnType<typeof useDisclosure>;
  colorMode?: 'light' | 'dark';
  children?: React.ReactNode;
}

/**
 * Top navigation bar.
 */
const TopNav: FC<ITopNavProps> = ({
  branding,
  wrapperProps,
  linkProps,
  searchProps,
  mobileMenuButtonProps,
  hamburgerIconProps,
  drawerDisclosure,
  colorMode,
  children
}) => {
  const { colorMode: chakraColorMode } = useColorMode();
  const [hamburgerClass, setHamburgerClass] = useState('');
  const { openLoginModal } = useAuthenticationContext();
  const { isOpen, onOpen, onClose } = drawerDisclosure;

  const navTopOffset = useNavOffset();
  const location = useLocation();
  const windowSize = useWindowSize();

  console.log('color mode: ', colorMode);

  const links: TTopNavLinkData[] = [
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
      name: 'Sign In',
      matchMethod: 'exact',
      onClick: openLoginModal
    },
    {
      name: 'Sign Up',
      matchMethod: 'exact',
      href: '/signup'
    }
  ];

  const activatedLinks = useMemo(() => {
    let activeLinkFound = false;
    return links.map(link => {
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

  return (
    <>
      <Center
        as="nav"
        position="sticky"
        top={navTopOffset}
        h="64px"
        px={{ base: 5, xl: 0 }}
        borderBottom="1px solid"
        borderBottomColor="topNav.borderColor"
        backgroundColor="shared.translucent.bgColor"
        backdropFilter="blur(10px)"
        zIndex={3}
        {...wrapperProps}
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
            <Spacer />
            <Center>
              <HStack spacing={4}>
                {
                  //! Causes hydration issue
                }
                <MemoizedLinks
                  links={activatedLinks}
                  props={{ ...navLinkProps, ...linkProps }}
                  activeProps={{
                    opacity: 1,
                    fontWeight: 'semibold'
                  }}
                />
                <Box display={{ base: 'none', md: 'initial' }}>
                  <SearchMenu
                    // width base 0 is a hack to prevent the menu from causing a horizontal scrollbar
                    styleProps={{
                      ...searchProps,
                      menuList: {
                        ...searchProps?.menuList,
                        width: { base: 0, md: '500px' },
                        zIndex: 3
                      }
                    }}
                  />
                </Box>
                <Link
                  display="inline-block"
                  href="https://github.com/Jan-Emig/snek-docs"
                  // This doesnt work for some reason (min-width solves it temporarily)
                  boxSize="32px"
                  minW="32px"
                  _hover={{
                    transform: 'scale(1.2)'
                  }}
                  transition="transform 0.2s ease-in-out"
                >
                  <GitHub
                    boxSize="32px"
                    fill={`topNav.${colorMode ?? chakraColorMode}.GitHubFill`}
                    transition="fill 0.2s ease-in-out"
                  />
                </Link>
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
          </Flex>
          {children}
        </VStack>
      </Center>
      <MobileNavDrawer isOpen={isOpen} onOpen={onOpen} onClose={closeDrawer} />
    </>
  );
};

export default TopNav;