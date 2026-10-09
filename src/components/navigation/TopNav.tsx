import { useAuth, useColorMode } from 'jaen';
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  Flex,
  HStack,
  ImageProps,
  LinkProps,
  Spacer,
  Theme,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { useLocation } from '@reach/router';
import { Link } from 'gatsby-plugin-jaen';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
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
 * Re-declares the theme's tokens for the bar in the colour mode the bar is
 * painted in, which is not always the page's.
 *
 * The bar is dark over the home hero in light mode, and dark on every route in
 * dark mode, while everything inside it reads semantic tokens: the search
 * control's text and border, the Sign Up border, the active link. v2's
 * DarkMode and LightMode only switched a React context and left those tokens
 * to follow the page. v3 has no such context, and jaen's two wrappers are a
 * `<Theme>` that re-declares the whole token block for its subtree, so the
 * wrapper has to name the bar's own mode or the bar ends up in the other one.
 *
 * This is jaen's DarkMode/LightMode (jaen/src/hooks/use-color-mode.tsx) with
 * the appearance as a prop, and the props after it are jaen's for the same
 * reasons: no surface of its own, no box in the layout, and neither the
 * foreground colour nor the palette `Theme` would otherwise force on the
 * subtree. Swapping jaen's two components instead would be two different
 * element types, so React would remount the whole bar, logo and search
 * included, every time the home page scrolls past the hero.
 */
const NavAppearance: FC<{ mode: 'light' | 'dark'; children: ReactNode }> = ({
  mode,
  children
}) => (
  <Theme
    appearance={mode}
    hasBackground={false}
    display="contents"
    color={undefined}
    colorPalette={undefined}
  >
    {children}
  </Theme>
);

/**
 * Top navigation bar.
 */
const TopNav: FC<ITopNavProps> = ({ path, children }) => {
  const [hamburgerClass, setHamburgerClass] = useState('');
  const { signinRedirect } = useAuth();
  const { open, onOpen, onClose } = useDisclosure();

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
          /**
           * A length, not the scale step `9`.
           *
           * v2's theme had numeric line heights (`lineHeights['9']` was
           * 2.25rem), so `lineHeight: 9` matched the box's own `h: 9` and
           * centred the label in it. v3's lineHeights scale has no numeric
           * keys, so the 9 went out unitless and meant nine times the font
           * size: 126px of line box inside a 36px box, which drew the label
           * 56px below its border, over the page.
           */
          lineHeight: '2.25rem'
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
    if (windowSize.width >= 768 && open) closeDrawer();
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

  const { colorMode: chakraColorMode } = useColorMode();

  const [colorMode, setColorMode] = useState<'light' | 'dark'>(
    path === '/' ? 'dark' : 'light'
  );

  useEffect(() => {
    if (path === '/') {
      const heroHeight = document.querySelector<HTMLDivElement>('#hero');
      if (!heroHeight) return;
      const heroHeightPx = heroHeight.getBoundingClientRect().height;
      // `open` is the drawer's own state. This used to read a second
      // useDisclosure that nothing ever opened, so on the home page in light
      // mode the bar stayed in its dark hero style above the white drawer and
      // the close button's white bars sat on a light grey square.
      const newColorMode =
        chakraColorMode === 'dark' || (scrollPos < heroHeightPx && !open)
          ? 'dark'
          : 'light';

      if (newColorMode !== colorMode) {
        setColorMode(newColorMode);
      }
    } else {
      setColorMode('light');
    }
  }, [path, scrollPos, open, chakraColorMode]);

  let linkProps: TTopNavLinkProps = { transition: 'opacity 0.2s ease-in-out' };

  let wrapperProps: BoxProps = {
    position: 'fixed',
    w: '100%'
  };

  /**
   * The mode the bar is painted in, and therefore the one its contents have to
   * read their tokens in.
   *
   * `colorMode` alone is not it. Away from the home page it is pinned to
   * 'light', while the bar below still turns dark whenever the site does. The
   * search control and the hamburger used to follow `colorMode`, which in dark
   * mode wrapped the search in LightMode inside a dark bar (gray.800 text on
   * the near-black bar, contrast 1.14) and painted the hamburger's bars black.
   */
  const navColorMode: 'light' | 'dark' =
    colorMode === 'dark' || chakraColorMode === 'dark' ? 'dark' : 'light';

  if (navColorMode === 'dark') {
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
      bgColor: open ? 'white' : 'rgba(255, 255, 255, 0.7)',
      color: 'black'
    };
    linkProps = {
      ...linkProps,
      _hover: {
        color: 'pq.500'
      }
    };
  }

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
        <VStack w="full" gap={0}>
          <Flex w="full" maxW="7xl">
            <NavAppearance mode={navColorMode}>
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
                gap={4}
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
                <HStack gap={4}>
                  <Box display={{ base: 'none', md: 'initial' }}>
                    <SearchMenu />
                  </Box>
                  <Button
                    // ghost-hover comes from the site's own button recipe. v3
                    // derives the variant union from generated recipe types,
                    // which this site does not produce, so the theme's value has
                    // to be cast past the built-in union.
                    variant={'ghost-hover' as never}
                    size="sm"
                    display={{ base: 'initial', md: 'none' }}
                    onClick={toggleMobileMenu}
                    {...(navColorMode === 'dark'
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
                        bgColor: `pq.layout.topNav.${navColorMode}.hamburger.backgroundColor`
                      }}
                    />
                  </Button>
                </HStack>
              </Center>
              <Center>
                <HStack
                  gap={4}
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
            </NavAppearance>
          </Flex>
          {children}
        </VStack>
      </Center>
      {/* MobileNavDrawer's own prop keeps the v2 spelling; only useDisclosure
          renamed its field. */}
      <MobileNavDrawer isOpen={open} onOpen={onOpen} onClose={closeDrawer} />
    </>
  );
};

export default TopNav;
