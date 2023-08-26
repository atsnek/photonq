import { Button, Box, Container, Center } from '@chakra-ui/react';
import { Field } from '@atsnek/jaen';
import { FC } from 'react';
import SectionTitle from '../../features/photonq/SectionTitle';

const AboutUs: FC = () => {
  return (
    <Box
      as="section"
      bgColor="pq.shared.section.bgColor"
      py={20}
      borderBottomRadius="3xl"
      color="gray.900"
    >
      <Container maxW="7xl" mx="auto">
        <SectionTitle
          label="About Us"
          labelFieldname="AboutUsLabel"
          title="The People Behind"
          alignItems
        />
        <Center>
          <Field.Text
            name="PhotonQText"
            defaultValue="We are a diverse team of scientists, designers, and software developers at the Christian Doppler Laboratory for Photonic Quantum Computing, located at the Faculty of Physics, University of Vienna. Our passion lies in advancing the field of photonic quantum computing, and we are dedicated to offering free online access to our cutting-edge quantum computer through cloud-based services. Experience the power of quantum computing firsthand with our state-of-the-art four-qubit processor, available for experimentation today!"
            mt={5}
            maxW="65%"
            textAlign="center"
          />
        </Center>
        <Center h="10vw" minH="35px" maxH="150px" mt={10}>
          <Field.Image name="AboutUsImage" objectFit="contain" />
        </Center>
      </Container>
    </Box>
  );
};

export default AboutUs;
