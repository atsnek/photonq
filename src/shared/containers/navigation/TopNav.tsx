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
  useDisclosure
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

const links: TTopNavLinkData[] = [
  {
    name: 'Home',
    href: '/photonq/',
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
    href: '/admin/'
  },
  {
    name: 'Sign Up',
    matchMethod: 'exact',
    href: '/admin/'
  }
];

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
  brandImage?: TBrandImage;
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
  brandImage,
  wrapperProps,
  linkProps,
  searchProps,
  mobileMenuButtonProps,
  hamburgerIconProps,
  drawerDisclosure,
  colorMode,
  children
}) => {
  const [hamburgerClass, setHamburgerClass] = useState('');
  const { isOpen, onOpen, onClose } = drawerDisclosure;

  const navTopOffset = useNavOffset();
  const location = useLocation();
  const windowSize = useWindowSize();

  const activatedLinks = useMemo(() => {
    let activeLinkFound = false;
    return links.map(link => {
      if (activeLinkFound) return link;
      const isActive = link.matchMethod
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
              href="/"
              _hover={{
                transform: 'scale(1.1)'
              }}
              transition="transform 0.2s ease-in-out"
            >
              <Image
                h="32px"
                {...brandImage?.props}
                src={brandImage?.src ?? SnekIcon}
                alt={brandImage?.alt ?? 'Snek Logo'}
              />
            </Link>
            <Spacer />
            <Center>
              <HStack spacing={4}>
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
                    fill={
                      colorMode
                        ? `topNav.${colorMode}.GitHubFill`
                        : 'topNav.GitHubFill'
                    }
                    transition="fill 0.2s ease-in-out"
                  />
                </Link>
                <Button
                  variant="ghost-hover"
                  size="sm"
                  display={{ base: 'initial', md: 'none' }}
                  {...mobileMenuButtonProps}
                >
                  <HamburgerMenuIcon
                    handleClick={toggleMobileMenu}
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
