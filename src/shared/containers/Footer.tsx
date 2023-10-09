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
import JaenLogoLight from '../../assets/icons/jaen_light.svg';
import JaenLogoDark from '../../assets/icons/jaen_dark.svg';
import Link from '../components/Link';

const year = new Date().getFullYear();

/**
 * Footer component.
 */
const Footer: FC = () => {
  const jaenImg = useColorModeValue(JaenLogoLight, JaenLogoDark);

  return (
    <Center as="footer" bgColor="footer.bgColor" color="footer.textColor">
      <Flex w="100%" maxW="7xl" px={6} py={12}>
        <VStack alignItems="start">
          <HStack>
            <Text>Powered by</Text>
            <LinkBox>
              <Image
                display="inherit"
                h="30px"
                src={jaenImg}
                alt="Jaen Logo"
                _hover={{
                  transform: 'scale(1.1)'
                }}
                transition="transform 0.2s ease-in-out"
              />
              <LinkOverlay href="/" />
            </LinkBox>
          </HStack>
          <Spacer />
          <Text mt={1} fontSize="xs">
            © {year} Snek.
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
            <Link href="/about" fontSize="xs" variant="hover-theme">
              About Us
            </Link>
          </VStack>
        </Box>
      </Flex>
    </Center>
  );
};

export default Footer;
