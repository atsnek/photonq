import { Box, Button, Container, Flex, Spacer } from '@chakra-ui/react';
import { FC } from 'react';
import { Field, useAuth } from 'jaen';
import SectionTitle from '../SectionTitle';
import { Link } from 'gatsby-plugin-jaen';

const PhotonQ: FC = () => {
  const isAuthenticated = useAuth().user !== null;

  return (
    <Box
      as="section"
      bgColor="pq.shared.section.bgColor"
      py={20}
      px={{ base: 5 }}
      color=""
    >
      <Flex maxW="7xl" mx="auto" wrap="wrap">
        <Box
          maxW={{ base: '100%', lg: '50%' }}
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
            color="pq.sections.photonq.description.color"
          />
          <Button
            as={Link}
            mt={7}
            variant="pq-solid"
            mx={{ base: 'auto', sm: 0 }}
            to={isAuthenticated ? '/new/experiment' : '/signup'}
          >
            {isAuthenticated ? 'New experiment' : 'Register Now'}
          </Button>
        </Box>
        <Spacer display={{ base: 'none', sm: 'inherit' }} />
        <Box
          h="30vw"
          minH="200px"
          maxH="316px"
          w={{ base: '100%', lg: '50%' }}
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
