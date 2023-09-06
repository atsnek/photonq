import { Box, Button, Center, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavOffset } from '../../shared/hooks/use-nav-offset';

import { Field } from '@atsnek/jaen';
import Link from '../../shared/components/Link';

const Hero: FC = () => {
  const navOffset = useNavOffset();

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
      <Box w="full" flexGrow={1} color="white" pt="64px">
        <Center h="full">
          <Box textAlign="center" position="relative">
            <Box
              position="absolute"
              top="calc(50% - 175px)"
              left={0}
              zIndex={0}
              bgColor="pq.500"
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
                fontSize="6xl"
                defaultValue="Start quantum computing with us"
              />
              <Field.Text
                name="heroSubtitle"
                fontSize="xl"
                mt={5}
                defaultValue="Learn quantum computing and run your circuits on your photonic quantum hardawre"
              />
              <Button
                as={Link}
                mt={10}
                variant="pq-outline"
                colorScheme="blue"
                px={5}
                borderRadius="xl"
                bgColor="rgba(2, 116, 192, 0.07)"
                href="/signup"
              >
                <Field.Text
                  as="span"
                  name="HeroButtonText"
                  defaultValue="Register Now"
                />
              </Button>
              <Center>
                <Box mt={20} w="50vw" maxW="512px" minW="250px">
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
