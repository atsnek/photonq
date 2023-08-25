import { FC, useEffect, useState } from 'react';
import Hero from './sections/Hero';
import Features from './sections/Features';
import { Global } from '@emotion/react';
import PhotonQ from './sections/PhotonQ';
import AboutUs from './sections/AboutUs';
import Footer from './sections/Footer';
import useScrollPosition from '../shared/hooks/use-scroll-position';
import { useDisclosure } from '@chakra-ui/react';

import GrayedUniWienLogo from '../photonq/assets/icons/uni-wien-logo-gray.svg';
import ColorizedUniWienLogo from '../photonq/assets/icons/uni-wien-logo-colorized.svg';
import AppLayout from '../shared/containers/AppLayout';
import {
  TTopNavLinkProps,
  TTopNavWrapperProps
} from '../shared/containers/navigation/TopNav';

interface ILandingPageContentProps {
  path?: string;
}

export const LandingPageContent: FC<ILandingPageContentProps> = ({ path }) => {
  const scrollPos = useScrollPosition();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');

  const topNavDisclosure = useDisclosure(); // Mobile menu drawer

  useEffect(() => {
    const heroHeight = document.querySelector<HTMLDivElement>('#hero');
    if (!heroHeight) return;
    const heroHeightPx = heroHeight.getBoundingClientRect().height;
    setColorMode(
      scrollPos < heroHeightPx && !topNavDisclosure.isOpen ? 'dark' : 'light'
    );
  }, [scrollPos, topNavDisclosure.isOpen]);

  let linkProps: TTopNavLinkProps = { transition: 'opacity 0.2s ease-in-out' };
  let wrapperProps: TTopNavWrapperProps = {
    position: 'fixed',
    w: '100%'
  };

  if (colorMode === 'dark') {
    wrapperProps = {
      ...wrapperProps,
      bgColor: 'rgba(13, 14, 17, 0.7)',
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
        link: linkProps,
        wrapper: wrapperProps,
        hamburger: {
          bgColor: `pq.layout.topNav.${colorMode}.hamburger.backgroundColor`
        },
        searchProps:
          colorMode === 'dark'
            ? {
                input: {
                  parent: {
                    _placeholder: {
                      color:
                        'pq.layout.topNav.dark.search.input.parent.placeholder.color'
                    },
                    borderColor:
                      'pq.layout.topNav.dark.search.input.parent.borderColor',
                    _hover: {
                      borderColor:
                        'pq.layout.topNav.dark.search.input._hover.borderColor',
                      bgColor:
                        'pq.layout.topNav.dark.search.input._hover.bgColor'
                    },
                    _focus: {
                      _placeholder: {
                        color:
                          'pq.layout.topNav.dark.search.input._focus.parent.placeholder.color'
                      },
                      bgColor:
                        'pq.layout.topNav.dark.search.input._focus.parent.backgroundColor',
                      borderColor:
                        'pq.layout.topNav.dark.search.input._focus.borderColor'
                    },
                    focusBorderColor:
                      'pq.layout.topNav.dark.search.input._focus.parent.borderColor'
                  },
                  kbd: {
                    borderColor:
                      'pq.layout.topNav.dark.search.input.kbd.borderColor',
                    color: 'pq.layout.topNav.dark.search.input.kbd.color'
                  }
                }
              }
            : undefined,
        mobileMenuButtonProps:
          colorMode === 'dark'
            ? {
                _hover: {
                  bgColor:
                    'pq.layout.topNav.dark.mobileMenuButton.backgroundColor'
                }
              }
            : undefined,
        colorMode
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
