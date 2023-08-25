// import {
//   Flex,
//   Center,
//   Spacer,
//   HStack,
//   LinkProps,
//   Image,
//   FlexProps,
//   BoxProps,
//   useDisclosure,
//   Button
// } from '@chakra-ui/react';
// import { FC, useEffect, useState } from 'react';
// import Link from '../core/Link';

// import GrayedUniWienLogo from '../../photonq/assets/icons/uni-wien-logo-gray.svg';
// import ColorizedUniWienLogo from '../../photonq/assets/icons/uni-wien-logo-colorized.svg';
// import { useNavOffset } from '../../hooks/use-nav-offset';
// import useScrollPosition from '../../hooks/use-scroll-position';
// import HamburgerMenuIcon from '../core/HamburgerMenuIcon';
// import MobileNavDrawer from '../../layout/navigation/MobileNavDrawer';
// import useWindowSize from '../../hooks/use-current-window-size';

// const TopNav: FC = () => {
//   const windowSize = useWindowSize();
//   const navOffset = useNavOffset();
//   const scrollPos = useScrollPosition();
//   const { isOpen, onOpen, onClose } = useDisclosure(); // Mobile nav menu drawer

//   const [hamburgerClass, setHamburgerClass] = useState('');
//   const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');

//   useEffect(() => {
//     const heroHeight = document.querySelector<HTMLDivElement>('#hero');
//     if (!heroHeight) return;
//     const heroHeightPx = heroHeight.getBoundingClientRect().height;
//     setColorMode(scrollPos < heroHeightPx && !isOpen ? 'dark' : 'light');
//   }, [scrollPos, isOpen]);

//   let linkProps: LinkProps = { transition: 'opacity 0.2s ease-in-out' };
//   let styleProps: FlexProps = {};
//   // let menuIconProps: BoxProps = {};

//   if (colorMode === 'dark') {
//     styleProps = {
//       bgColor: 'rgba(13, 14, 17, 0.7)',
//       color: 'pq.layout.topNav.color'
//     };
//     linkProps = {
//       ...linkProps,
//       opacity: 0.4,
//       _hover: {
//         opacity: 1
//       }
//     };
//     // menuIconProps = {
//     //   color: 'pq.layout.topNav.hamburger.dark.color'
//     // };
//   } else {
//     styleProps = {
//       bgColor: isOpen ? 'white' : 'rgba(255, 255, 255, 0.7)',
//       color: 'black'
//     };
//     linkProps = {
//       ...linkProps,
//       _hover: {
//         color: 'pq.500'
//       }
//     };
//   }

//   useEffect(() => {
//     if (windowSize.width >= 768 && isOpen) closeDrawer();
//   }, [windowSize.width]);

//   const openDrawer = () => {
//     setHamburgerClass('open');
//     onOpen();
//   };

//   const closeDrawer = () => {
//     setHamburgerClass('');

//     onClose();
//   };

//   const toggleMobileMenu = () => {
//     if (hamburgerClass === 'open') closeDrawer();
//     else openDrawer();
//   };

//   return (
//     <>
//       <Flex
//         as="nav"
//         position="sticky"
//         w="full"
//         h="64px"
//         top={navOffset}
//         {...styleProps}
//         backdropFilter="blur(10px)"
//         fontWeight={500}
//         zIndex={1000}
//         transition="background-color 0.2s ease-in-out"
//         p={5}
//       >
//         <Center>
//           <Link href="/">
//             <Image
//               w="auto"
//               h="50px"
//               src={
//                 colorMode === 'dark' ? GrayedUniWienLogo : ColorizedUniWienLogo
//               }
//             ></Image>
//           </Link>
//         </Center>
//         <Spacer />
//         <Center
//           as={HStack}
//           spacing={10}
//           display={{ base: 'none', md: 'inherit' }}
//         >
//           <Link {...linkProps}>Home</Link>
//           <Link {...linkProps}>Documentation</Link>
//           <Link {...linkProps}>Sign In</Link>
//           <Link {...linkProps}>Sign Up</Link>
//         </Center>
//         <Spacer />
//         <Center>
//           <Button
//             variant="pq-ghost"
//             opacity={0.4}
//             _hover={{ opacity: 1 }}
//             transition="opacity 0.2s ease-in-out"
//             onClick={toggleMobileMenu}
//             display={{ base: 'initial', md: 'none' }}
//           >
//             <HamburgerMenuIcon
//               iconProps={{
//                 bgColor: `pq.layout.topNav.hamburger.${colorMode}.color`
//               }}
//               wrapperProps={{ mx: 'auto', className: hamburgerClass }}
//             />
//           </Button>
//         </Center>
//       </Flex>
//       <MobileNavDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
//     </>
//   );
// };

// export default TopNav;
