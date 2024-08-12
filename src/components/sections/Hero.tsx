import { Box, Button, Center, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { Field, useAuth } from 'jaen';
import useNavOffset from '../../hooks/use-nav-offset';
import { Link } from 'gatsby-plugin-jaen';

const Hero: FC = () => {
  const navOffset = useNavOffset();

  const isAuthenticated = useAuth().user !== null;

  return (
    <VStack
      h={{ base: 'max-content', md: `calc(100vh - ${navOffset} - 200px)` }}
      minH="700px"
      bgColor="pq.shared.body.bgColor"
      spacing={0}
      id="hero"
      overflow="hidden"
      p={{ base: 5, lg: 0 }}
    >
      <Box
        w="full"
        flexGrow={1}
        color="white"
        pt={{
          base: 20,
          md: 40
        }}
      >
        <Center h="full">
          <Box textAlign="center" position="relative">
            <Box
              position="absolute"
              top="calc(50% - 175px)"
              left={0}
              zIndex={0}
              bgColor="brand.500"
              boxSize="290px"
              filter="blur(140px)"
              opacity={1}
            />
            <Box
              position="absolute"
              top="calc(50% - 175px)"
              right="-145px"
              zIndex={0}
              bgColor="#A71C48"
              boxSize="290px"
              filter="blur(140px)"
              opacity={1}
            />
            <Box position="relative">
              <Field.Text
                name="heroTitle"
                fontSize={{
                  base: '4xl',
                  md: '5xl',
                  lg: '6xl'
                }}
                defaultValue="Start quantum computing with us"
              />
              <Field.Text
                name="heroSubtitle"
                fontSize={{
                  base: 'lg',
                  md: 'xl'
                }}
                mt={5}
                defaultValue="Learn quantum computing and run your circuits on your photonic quantum hardawre"
              />
              <Button
                as={Link}
                mt={10}
                variant="pq-outline"
                colorScheme="brand"
                px={5}
                borderRadius="xl"
                bgColor="rgba(2, 116, 192, 0.07)"
                to={isAuthenticated ? '/new/experiment' : '/signup'}
              >
                {isAuthenticated ? 'New experiment' : 'Register Now'}
              </Button>
              <Center>
                <Box mt={20} w="50vw" maxW="300px" minW="250px">
                  <Field.Image name="heroImage" />
                </Box>
              </Center>
            </Box>
          </Box>
        </Center>
      </Box>
      {/* <Box
        position="relative"
        bottom={{ base: -5, lg: 0 }}
        w={{ base: 'calc(100% + 2.5rem)', lg: 'full' }}
        h="50px"
        bgColor="pq.shared.section.bgColor"
        borderTopRadius="3xl"
      /> */}
    </VStack>
  );
};

export default Hero;
