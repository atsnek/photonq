import { Field, useAuth } from 'jaen';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import { FC } from 'react';
import { Link as GatsbyLink } from 'gatsby-plugin-jaen';
import UniWienLogo from '../../assets/icons/uni-wien-logo-gray.svg';

const FooterLink: FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children
}) => (
  <Link
    as={GatsbyLink}
    to={href}
    variant="hover-theme"
    opacity={0.7}
    _hover={{ opacity: 1 }}
    isExternal={href.startsWith('http')}
  >
    {children}
  </Link>
);

const FooterLinkGroup: FC<{
  title: string;
  links: Array<{ label: string; href: string }>;
}> = ({ title, links }) => (
  <VStack spacing={3} alignItems="start">
    <Heading as="h3" size="sm" fontWeight="500">
      {title}
    </Heading>
    {links.map((link, i) => (
      <FooterLink key={i} href={link.href}>
        {link.label}
      </FooterLink>
    ))}
  </VStack>
);

const Footer: FC<{
  pullUp?: boolean;
}> = ({ pullUp = false }) => {
  const { isAuthenticated } = useAuth();

  const linkGroups = [
    {
      title: 'Links',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Experiments', href: '/experiments' },
        { label: 'Imprint', href: '/imprint' },
        { label: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Partners',
      links: [
        {
          label: 'Christian Doppler Forschungsgesellschaft',
          href: 'https://www.cdg.ac.at'
        },
        { label: 'University of Vienna', href: 'https://www.univie.ac.at' }
      ]
    },
    {
      title: 'PhotonQ is brought to you by',
      links: [
        {
          label: 'Christian Doppler Laboratory for Photonic Quantum Computing',
          href: 'https://www.cdg.ac.at/forschungseinheiten/labor/optische-quantencomputer'
        },
        { label: 'Walther Group', href: 'https://walther.quantum.at' },
        {
          label: 'Faculty of Physics, University of Vienna',
          href: 'https://physik.univie.ac.at/en'
        }
      ]
    }
  ];

  return (
    <Box
      as="footer"
      position="relative"
      mt={pullUp ? -50 : 0}
      pt={20}
      pb={10}
      px={4}
      bgColor="pq.shared.body.bgColor"
      color="white"
      overflow="hidden"
      zIndex={0}
    >
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
      <Container maxW="7xl">
        <Stack spacing={10}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
          >
            <VStack
              align={{ base: 'center', md: 'start' }}
              spacing={4}
              mb={{ base: 6, md: 0 }}
            >
              <Field.Text
                name="FooterTitleLine1"
                defaultValue="Exploring"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight="500"
                lineHeight="1.2"
                textAlign={{ base: 'center', md: 'left' }}
              />
              <Field.Text
                name="FooterTitleLine2"
                defaultValue="Quantum Frontiers"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight="500"
                lineHeight="1.2"
                textAlign={{ base: 'center', md: 'left' }}
              />
              <Field.Text
                name="FooterText"
                defaultValue="Join us on our journey to push the boundaries of quantum computing and unlock the potential of this transformative technology, as we strive to make quantum accessible to all and shape the future of computing."
                fontSize={{ base: 'md', lg: 'lg' }}
                maxW="600px"
                textAlign={{ base: 'center', md: 'left' }}
                opacity={0.8}
              />
            </VStack>
            <Button
              as={GatsbyLink}
              variant="pq-outline"
              colorScheme="blue"
              borderRadius="xl"
              bgColor="rgba(2, 116, 192, 0.07)"
              px={5}
              mt={{ base: 4, md: 0 }}
              to={isAuthenticated ? '/new/experiment' : '/signup'}
            >
              {isAuthenticated ? 'New experiment' : 'Register Now'}
            </Button>
          </Flex>

          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)'
            }}
            gap={8}
          >
            <Image
              minH="35px"
              maxH="150px"
              src={UniWienLogo}
              alt="University of Vienna Logo"
            />
            {linkGroups.map((group, i) => (
              <FooterLinkGroup
                key={i}
                title={group.title}
                links={group.links}
              />
            ))}
          </Grid>

          <Divider opacity={0.1} />

          <Field.Text
            name="FooterBottomText"
            defaultValue={`Copyright © ${new Date().getFullYear()} Walther Group, Faculty of Physics, University of Vienna. All rights reserved.`}
            opacity={0.2}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s ease-in-out"
            fontSize="sm"
            textAlign="center"
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
