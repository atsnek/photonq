import {
  Box,
  BoxProps,
  Button,
  Center,
  Container,
  HStack,
  Stack,
  VStack
} from '@chakra-ui/react';
import { FC } from 'react';
import { Field } from 'jaen';
import { TextFieldProps } from 'jaen/dist/fields/TextField/TextField';
import { Link } from 'gatsby-plugin-jaen';
import { QASMPlayground } from '../main-content/qasm-playground/components/qasm-playground';
import SectionTitle from '../SectionTitle';

const Features: FC = () => {
  const cardProps: BoxProps = {
    bgColor: 'pq.sections.features.card.bgColor',
    boxShadow: '4px 2px 16px -12px rgba(0,0,0,0.25)',
    padding: {
      base: 4,
      sm: 10
    },
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
    color: 'pq.components.featureCard.title.color'
  };

  return (
    <Box
      as="section"
      bgColor="pq.shared.section.bgColor"
      py={20}
      borderTopRadius="3xl"
      color="pq.shared.section.color"
    >
      <Container maxW="7xl">
        <VStack spacing="10">
          <SectionTitle
            label="Features"
            labelFieldname="featuresLabel"
            title="Explore Quantum Computing"
            alignItems
            titleProps={{
              color: 'pq.components.sectionTitle.color'
            }}
          />
          <HStack
            gap={10}
            wrap={{ base: 'wrap', md: 'nowrap' }}
            alignItems="stretch"
          >
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
            <Box {...cardProps}>
              <Box>
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
              <Box w="90%" ml="auto" borderTopLeftRadius="lg" overflow="hidden">
                <Field.Image name="RightCardImage" />
              </Box>
            </Box>
          </HStack>
        </VStack>
      </Container>

      <Box>
        <Container maxW="8xl" py="10">
          <Stack spacing="4">
            <VStack w="full">
              <Field.Text
                {...cardTitleProps}
                fontSize={{ base: 'xl', md: '2xl' }}
                name="codeCardTitle"
                defaultValue="Quantum Code Playground"
              />
              <Field.Text
                name="CodeCardText"
                defaultValue="Dive into the world of quantum computing with our interactive platform. Write and run quantum code, experiment with quantum algorithms, and unlock the potential of this cutting-edge technology"
                mt={3}
                maxW={{ base: 'full', md: '50%' }}
                textAlign="center"
                color="pq.components.featureCard.color"
              />
            </VStack>

            <QASMPlayground
              children={`// quantum ripple-carry adder from Cuccaro et al, quant-ph/0410184
OPENQASM 2.0;
include "qelib1.inc";
gate majority a,b,c 
{ 
  cx c,b; 
  cx c,a; 
  ccx a,b,c; 
}
gate unmaj a,b,c 
{ 
  ccx a,b,c; 
  cx c,a; 
  cx a,b; 
}
qreg cin[1];
qreg a[4];
qreg b[4];
qreg cout[1];
creg ans[5];
// set input states
x a[0]; // a = 0001
x b;    // b = 1111
// add a to b, storing result in b
majority cin[0],b[0],a[0];
majority a[0],b[1],a[1];
majority a[1],b[2],a[2];
majority a[2],b[3],a[3];
cx a[3],cout[0];
unmaj a[2],b[3],a[3];
unmaj a[1],b[2],a[2];
unmaj a[0],b[1],a[1];
unmaj cin[0],b[0],a[0];
measure b[0] -> ans[0];
measure b[1] -> ans[1];
measure b[2] -> ans[2];
measure b[3] -> ans[3];
measure cout[0] -> ans[4];`}
            />
          </Stack>
        </Container>
      </Box>

      {/* <Box {...cardProps} w="100%" mt={7}>
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
      </Container> */}
    </Box>
  );
};

export default Features;
