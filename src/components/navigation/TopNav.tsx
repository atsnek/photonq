import { useAuth } from '@atsnek/jaen';
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  DarkMode,
  Flex,
  HStack,
  ImageProps,
  LightMode,
  LinkProps,
  Spacer,
  VStack,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import { useLocation } from '@reach/router';
import { Link } from 'gatsby-plugin-jaen';
import { FC, useEffect, useMemo, useState } from 'react';
import Logo from '../../gatsby-plugin-jaen/components/Logo';
import useWindowSize from '../../hooks/use-current-window-size';
import useScrollPosition from '../../hooks/use-scroll-position';
import HamburgerMenuIcon from '../HamburgerMenuIcon';
import Links from '../Links';
import SearchMenu from '../search-menu';
import { TLinkData } from '../types';
import MobileNavDrawer from './MobileNavDrawer';

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

type TTopNavLinkData = TLinkData & {
  matchMethod: 'exact' | 'includes';
  style?: LinkProps;
};

interface ITopNavProps {
  path: string;
  children?: React.ReactNode;
}

/**
 * Top navigation bar.
 */
const TopNav: FC<ITopNavProps> = ({ path, children }) => {
  const [hamburgerClass, setHamburgerClass] = useState('');
  const { signinRedirect } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();
  const windowSize = useWindowSize();

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
        onClick: signinRedirect
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

  const scrollPos = useScrollPosition();

  const topNavDisclosure = useDisclosure(); // Mobile menu drawer

  const { colorMode: chakraColorMode } = useColorMode();

  const [colorMode, setColorMode] = useState<'light' | 'dark'>(
    path === '/' ? 'dark' : 'light'
  );

  useEffect(() => {
    if (path === '/') {
      const heroHeight = document.querySelector<HTMLDivElement>('#hero');
      if (!heroHeight) return;
      const heroHeightPx = heroHeight.getBoundingClientRect().height;
      const newColorMode =
        chakraColorMode === 'dark' ||
        (scrollPos < heroHeightPx && !topNavDisclosure.isOpen)
          ? 'dark'
          : 'light';

      if (newColorMode !== colorMode) {
        setColorMode(newColorMode);
      }
    } else {
      setColorMode('light');
    }
  }, [path, scrollPos, topNavDisclosure.isOpen, chakraColorMode]);

  let linkProps: TTopNavLinkProps = { transition: 'opacity 0.2s ease-in-out' };

  let wrapperProps: BoxProps = {
    position: 'fixed',
    w: '100%'
  };

  if (colorMode === 'dark' || chakraColorMode === 'dark') {
    wrapperProps = {
      ...wrapperProps,
      backgroundColor: 'rgba(13, 14, 17, 0.7)',
      color: 'pq.layout.topNav.color',
      borderBottom: 'none'
    };
    linkProps = {
      ...linkProps,
      opacity: 0.4,
      _hover: {
        opacity: 1
      }
    };
  } else {
    wrapperProps = {
      ...wrapperProps,
      bgColor: topNavDisclosure.isOpen ? 'white' : 'rgba(255, 255, 255, 0.7)',
      color: 'black'
    };
    linkProps = {
      ...linkProps,
      _hover: {
        color: 'pq.500'
      }
    };
  }

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
              to="/"
              w="150px"
              _hover={{
                transform: 'scale(1.1)'
              }}
              transition="transform 0.2s ease-in-out"
            >
              <Logo forceColorMode={path === '/' ? colorMode : undefined} />
            </Link>
            <HStack
              spacing={4}
              ml={5}
              display={{
                base: 'none',
                md: 'flex'
              }}
            >
              <Links
                links={activatedLinks}
                props={{
                  ...navLinkProps,
                  ...linkProps
                }}
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
                  {...(colorMode === 'dark'
                    ? {
                        _hover: {
                          bgColor:
                            'pq.layout.topNav.dark.mobileMenuButton.backgroundColor'
                        }
                      }
                    : {})}
                >
                  <HamburgerMenuIcon
                    wrapperProps={{ className: hamburgerClass }}
                    iconProps={{
                      bgColor: `pq.layout.topNav.${colorMode}.hamburger.backgroundColor`
                    }}
                  />
                </Button>
              </HStack>
            </Center>
            <Center>
              <HStack
                spacing={4}
                ml={4}
                display={{
                  base: 'none',
                  md: 'flex'
                }}
              >
                <Links
                  links={links.right}
                  props={{ ...navLinkProps, ...linkProps }}
                  activeProps={{
                    opacity: 1,
                    fontWeight: 'semibold',
                    color: 'topNav.links.active.color'
                  }}
                />
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
