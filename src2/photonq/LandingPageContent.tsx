import { FC, useEffect, useState } from 'react';
import Hero from './sections/Hero';
import Features from './sections/Features';
import { Global } from '@emotion/react';
import PhotonQ from './sections/PhotonQ';
import AboutUs from './sections/AboutUs';
import Footer from './sections/Footer';
import useScrollPosition from '../shared/hooks/use-scroll-position';
import {
  useDisclosure,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';

import AppLayout from '../shared/containers/AppLayout';
import {
  TTopNavLinkProps,
  TTopNavWrapperProps
} from '../shared/containers/navigation/TopNav';
import { useAuth } from '@atsnek/jaen';

interface ILandingPageContentProps {
  path?: string;
}

export const LandingPageContent: FC<ILandingPageContentProps> = ({ path }) => {
  const scrollPos = useScrollPosition();
  const { colorMode: chakraColorMode } = useColorMode();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');
  const { isAuthenticated } = useAuth();

  const topNavDisclosure = useDisclosure(); // Mobile menu drawer

  useEffect(() => {
    const heroHeight = document.querySelector<HTMLDivElement>('#hero');
    if (!heroHeight) return;
    const heroHeightPx = heroHeight.getBoundingClientRect().height;
    const newColorMode =
      chakraColorMode === 'dark' ||
      (scrollPos < heroHeightPx && !topNavDisclosure.isOpen)
        ? 'dark'
        : 'light';
    if (newColorMode !== colorMode) setColorMode(newColorMode);
  }, [scrollPos, topNavDisclosure.isOpen, chakraColorMode]);

  let linkProps: TTopNavLinkProps = { transition: 'opacity 0.2s ease-in-out' };
  let wrapperProps: TTopNavWrapperProps = {
    position: 'fixed',
    w: '100%'
  };

  //? Maybe we keep the top nav dark in dark mode?
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

  return (
    <AppLayout
      footer={Footer}
      customTopNavDisclosure={topNavDisclosure}
      topNavProps={{
        isVisible: !isAuthenticated,
        link: linkProps,
        wrapper: wrapperProps,
        hamburger: {
          bgColor: `pq.layout.topNav.${colorMode}.hamburger.backgroundColor`
        },
        mobileMenuButtonProps:
          colorMode === 'dark'
            ? {
                _hover: {
                  bgColor:
                    'pq.layout.topNav.dark.mobileMenuButton.backgroundColor'
                }
              }
            : undefined,
        colorMode,
        showThemeToggle: true
      }}
      branding={{
        colorMode: colorMode
      }}
      // brandImage={{
      //   props: { h: '50px' },
      //   src: colorMode === 'dark' ? GrayedUniWienLogo : ColorizedUniWienLogo,
      //   alt: ''
      // }}
    >
      <Global
        styles={{
          body: {
            backgroundColor: '#0D0E11'
          }
        }}
      />
      <Hero />
      <Features />
      <PhotonQ />
      <AboutUs />
    </AppLayout>
  );
};
