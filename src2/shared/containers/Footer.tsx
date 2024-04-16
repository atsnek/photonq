import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import { FC } from 'react';
import GrayedUniWienLogo from '../../photonq/assets/icons/uni-wien-logo-gray.svg';
import ColorizedUniWienLogo from '../../photonq/assets/icons/uni-wien-logo-colorized.svg';
import Link from '../components/Link';

const year = new Date().getFullYear();

/**
 * Footer component.
 */
const Footer: FC = () => {
  const branding = useColorModeValue(ColorizedUniWienLogo, GrayedUniWienLogo);

  return (
    <Center as="footer" bgColor="footer.bgColor" color="footer.textColor">
      <Flex w="100%" maxW="7xl" px={6} py={12}>
        <VStack alignItems="start">
          <HStack>
            <LinkBox
              _hover={{
                img: {
                  transform: 'scale(1.1)'
                }
              }}
            >
              <Image
                display="inherit"
                h="40px"
                src={branding}
                alt="University of Vienna"
                transition="transform 0.2s ease-in-out"
              />
              <LinkOverlay href="https://www.univie.ac.at/" />
            </LinkBox>
          </HStack>
          <Spacer />
          <Text mt={1} fontSize="xs">
            Copyright © {year} Walther Group, Faculty of Physics, University of Vienna. All rights
            reserved.
          </Text>
        </VStack>
        <Spacer />
        <Box>
          <VStack spacing={1} alignItems="end">
            <Link href="/imprint" fontSize="xs" variant="hover-theme">
              Imprint
            </Link>
            <Link href="/contact" fontSize="xs" variant="hover-theme">
              Contact
            </Link>
          </VStack>
        </Box>
      </Flex>
    </Center>
  );
};

export default Footer;
