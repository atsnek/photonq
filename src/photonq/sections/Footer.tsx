import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Image,
  Spacer,
  VStack
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { useNavOffset } from '../../shared/hooks/use-nav-offset';
import { Field } from '@atsnek/jaen';

import UniWienLogo from '../assets/icons/uni-wien-logo-gray.svg';
import Link from '../../shared/components/Link';

const Footer: FC = () => {
  const navOffset = useNavOffset();

  const links = [
    [
      {
        label: 'Links',
        isTitle: true
      },
      {
        label: 'Terms & Conditions',
        href: '#'
      },
      {
        label: 'Imprint',
        href: '#'
      }
    ],
    [
      {
        label: 'Partners',
        isTitle: true
      },
      {
        label: 'Christian Doppler Forschungsgesellschaft',
        href: '#'
      },
      {
        label: 'University of Vienna',
        href: '#'
      }
    ],
    [
      {
        label: 'PhotonQ is brought to you by',
        isTitle: true
      },
      {
        label: 'Christian Doppler Laboratory for Photonic Quantum Computing',
        href: '#'
      },
      {
        label: 'Walther Group',
        href: '#'
      },
      {
        label: 'Faculty of Phsycis, University of Vienna',
        href: '#'
      }
    ]
  ];

  const linkElmnts: ReactNode[] = [];

  links.forEach((linkGroup, i) => {
    linkElmnts.push(
      <VStack spacing={3} alignItems="start" wrap="wrap" key={i}>
        {linkGroup.map((link, i) => {
          if ('isTitle' in link) {
            return (
              <Field.Text
                key={i}
                name={'FooterLinkTitle' + link.label}
                defaultValue={link.label}
                fontWeight="500"
              />
            );
          }
          return (
            <Link
              key={i}
              href={link.href}
              color="white"
              opacity={0.7}
              _hover={{
                opacity: 1
              }}
            >
              <Field.Text
                name={'FooterLink' + link.label}
                defaultValue={link.label}
              />
            </Link>
          );
        })}
      </VStack>
    );
  });

  return (
    <Box
      pb={20}
      position="relative"
      mt="-25px"
      px={{ base: 5, lg: 0 }}
      overflowX="hidden"
      bgColor="pq.shared.body.bgColor"
    >
      <Box
        position="relative"
        w="full"
        h="50px"
        bgColor="pq.shared.section.bgColor"
        borderBottomRadius="3xl"
        zIndex={1}
      />
      <Box
        position="absolute"
        top="-122px"
        left="10%"
        zIndex={0}
        bgColor="pq.500"
        boxSize="290px"
        filter="blur(140px)"
      />
      <Box
        position="absolute"
        top="-122px"
        right="10%"
        zIndex={0}
        bgColor="#A71C48"
        boxSize="290px"
        filter="blur(140px)"
      />
      <Container maxW="7xl" h="100%">
        <Box mt="20vh" color="white">
          <Flex
            maxW={{ base: 'full', lg: '75%' }}
            wrap={{ base: 'wrap', lg: 'nowrap' }}
          >
            <Box
              w={{ base: 'full', lg: 'fit-content' }}
              textAlign={{ base: 'center', lg: 'initial' }}
            >
              <Field.Text
                name="FooterTitleLine1"
                defaultValue="Exploring"
                fontSize="6xl"
                fontWeight="500"
                w={{ base: 'full', lg: 'fit-content' }}
                display={{ base: 'block', lg: 'initial' }}
              />
              <Field.Text
                name="FooterTitleLine2"
                defaultValue="Quantum Frontiers"
                fontSize="6xl"
                fontWeight="500"
                w={{ base: 'full', lg: 'fit-content' }}
                display={{ base: 'block', lg: 'initial' }}
              />
            </Box>
            <Spacer />
            <Button
              variant="pq-outline"
              colorScheme="blue"
              borderRadius="xl"
              bgColor="rgba(2, 116, 192, 0.07)"
              px={5}
              mt={{ base: 5, lg: 'auto' }}
              mr="auto"
              ml={{ base: 'auto', lg: 'initial' }}
              mb={3}
            >
              <Field.Text name="FooterButtonText" defaultValue="Register Now" />
            </Button>
          </Flex>
          <Field.Text
            name="FooterText"
            defaultValue="Join us on our journey to push the boundaries of quantum computing and unlock the potential of this transformative technology, as we strive to make quantum accessible to all and shape the future of computing."
            mt={10}
            maxW={{ base: 'full', lg: '50%' }}
            fontSize="xl"
            textAlign={{ base: 'center', lg: 'initial' }}
          />
        </Box>
        <Flex mt={20} color="white" wrap={{ base: 'wrap', sm: 'nowrap' }}>
          <Image h="50px" src={UniWienLogo}></Image>
          <Spacer minW={{ base: '5rem', lg: '25%' }} />
          <HStack
            alignItems="start"
            spacing={{ base: 5, sm: 20 }}
            wrap={{ base: 'wrap', md: 'nowrap' }}
            mt={{ base: 10, md: 0 }}
          >
            {linkElmnts}
          </HStack>
        </Flex>
        <Divider mt={20} opacity={0.1} />
        <Field.Text
          name="FooterBottomText"
          defaultValue="Copyright © 2023 Walther Group, Faculty of Physics, University of Vienna. All rights reserved."
          mt={5}
          color="white"
          opacity={0.2}
          _hover={{
            opacity: 1
          }}
          cursor="default"
          transition="opacity 0.2s ease-in-out"
        />
      </Container>
    </Box>
  );
};

export default Footer;
