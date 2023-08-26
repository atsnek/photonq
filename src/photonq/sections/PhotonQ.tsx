import { Box, Button, Container, Flex, Spacer } from '@chakra-ui/react';
import { FC } from 'react';
import SectionTitle from '../../features/photonq/SectionTitle';
import { Field } from '@atsnek/jaen';

const PhotonQ: FC = () => {
  return (
    <Box
      as="section"
      bgColor="pq.shared.section.bgColor"
      py={20}
      px={{ base: 5 }}
      color="gray.900"
    >
      <Flex maxW="7xl" mx="auto" wrap="wrap">
        <Box
          maxW="50%"
          order={{ base: 2, sm: 0 }}
          mx="auto"
          mt={{ base: 5, sm: 0 }}
        >
          <SectionTitle
            label="PhotonQ"
            labelFieldname="PhotonQLabel"
            title="One-way Quantum Computing"
          />
          <Field.Text
            name="PhotonQText"
            defaultValue="PhotonQ provides cloud-based access to a real photonic one-way computer backend. Our system exploits cutting-edge quantum photonic technology to realize a photonic quantum computing platform. The quantum processing unit can be accessed and programmed through our customized user interface."
            mt={5}
          />
          <Button
            mt={7}
            variant="pq-solid"
            display="block"
            mx={{ base: 'auto', sm: 0 }}
          >
            <Field.Text
              name="PhotonQButtonText"
              defaultValue="Register Now"
            ></Field.Text>
          </Button>
        </Box>
        <Spacer display={{ base: 'none', sm: 'inherit' }} />
        <Box
          h="30vw"
          minH="200px"
          maxH="316px"
          _hover={{
            transform: 'scale(1.05)'
          }}
          transition="transform .2s ease-in-out"
          order={{ base: 1, sm: 0 }}
          my="auto"
          mx="auto"
        >
          <Field.Image name="PhotonQRightIamge" objectFit="contain" />
        </Box>
      </Flex>
    </Box>
  );
};

export default PhotonQ;
