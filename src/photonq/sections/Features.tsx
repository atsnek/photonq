import {
  Box,
  BoxProps,
  Button,
  Center,
  Container,
  HStack,
  VStack
} from '@chakra-ui/react';
import { FC } from 'react';
import SectionTitle from '../../features/photonq/SectionTitle';
import { Field } from '@atsnek/jaen';
import { TextFieldProps } from '@atsnek/jaen/dist/fields/TextField/TextField';
import Link from '../../shared/components/Link';

const Features: FC = () => {
  const cardProps: BoxProps = {
    bgColor: 'pq.sections.features.card.bgColor',
    boxShadow: '4px 2px 16px -12px rgba(0,0,0,0.25)',
    padding: 10,
    borderRadius: '3xl',
    overflow: 'hidden',
    _hover: {
      transform: 'scale(1.01)',
      boxShadow: '6px 4px 20px -12px rgba(0,0,0,0.25)'
    },
    transition:
      'transform 0.2s cubic-bezier(.17,.67,.83,.67), box-shadow 0.2s cubic-bezier(.17,.67,.83,.67)'
  };

  const cardTitleProps: TextFieldProps = {
    fontSize: 'xl',
    fontWeight: 500,
    mt: 10,
    color: 'pq.sections.features.title.color'
  };

  //! Causes hydration issue
  return (
    <Box
      as="section"
      bgColor="pq.shared.section.bgColor"
      py={20}
      borderTopRadius="3xl"
      color="pq.shared.section.color"
    >
      <Container maxW="7xl">
        <SectionTitle
          label="Features"
          labelFieldname="featuresLabel"
          title="Explore Quantum Computing"
          alignItems
        />
        <Box mt={10}>
          <VStack>
            <HStack gap={10} wrap={{ base: 'wrap', md: 'nowrap' }}>
              <Box {...cardProps}>
                <Box w="75%" mx="auto">
                  <Field.Image name="LeftCardImage" />
                </Box>
                <Field.Text
                  {...cardTitleProps}
                  name="leftCardTitle"
                  defaultValue="Run intuitive experiments"
                />
                <Field.Text
                  name="LeftCardText"
                  defaultValue="Unleash your curiosity and dive into the realm of quantum experimentation with our intuitive tools, empowering you to design and run your own insightful quantum experiments with ease and precision."
                  color="pq.components.featureCard.color"
                  mt={3}
                />
                <Button as={Link} my={5} variant="pq-solid" href="/docs">
                  <Field.Text
                    as="span"
                    name="LeftCardButtonText"
                    defaultValue="Get Started"
                  ></Field.Text>
                </Button>
              </Box>
              <Box {...cardProps} p={0}>
                <Box m={10}>
                  <Field.Text
                    name="RightCardTitle"
                    {...cardTitleProps}
                    defaultValue="Get results for your experiments"
                  />
                  <Field.Text
                    name="RightCardText"
                    defaultValue="Unlock profound discoveries and gain valuable insights from your quantum experiments with PhotonQ's powerful computational capabilities, delivering fast and precise results for your research endeavors."
                    color="pq.components.featureCard.color"
                    mt={3}
                  />
                  <Button as={Link} my={5} variant="pq-solid" href="/docs">
                    <Field.Text
                      as="span"
                      name="RightCardButtonText"
                      defaultValue="Get Started"
                    ></Field.Text>
                  </Button>
                </Box>
                <Box
                  w="90%"
                  ml="auto"
                  borderTopLeftRadius="lg"
                  overflow="hidden"
                >
                  <Field.Image name="RightCardImage" />
                </Box>
              </Box>
            </HStack>
            <Box {...cardProps} w="100%" mt={7}>
              <Box w="30%" minW={{ base: '100px', md: '300px' }} m="auto">
                <Field.Image name="BottomCardImage" />
              </Box>
              <Center>
                <Field.Text
                  mt={10}
                  {...cardTitleProps}
                  name="BottomCardTitle"
                  defaultValue="Learn quantum computing from the start"
                />
              </Center>
              <Center>
                <Field.Text
                  name="BottomCardText"
                  defaultValue="Embark on a quantum computing adventure, starting from the basics, and master the foundations of this groundbreaking field through our comprehensive learning resources."
                  color="pq.components.featureCard.color"
                  mt={3}
                  maxW={{ base: 'full', md: '50%' }}
                  textAlign="center"
                />
              </Center>
              <Center>
                <Button as={Link} my={5} variant="pq-solid" href="/docs">
                  <Field.Text
                    as="span"
                    name="RightCardButtonText"
                    defaultValue="Get Started"
                  ></Field.Text>
                </Button>
              </Center>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
