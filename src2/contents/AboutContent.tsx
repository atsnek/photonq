import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { FC } from 'react';
import BaseContentLayout from '../shared/containers/BaseContentLayout';
import { Field } from '@atsnek/jaen';

/**
 * Content for the contact page.
 */
const AboutContent: FC = () => {
  return (
    <BaseContentLayout>
      <Heading
        as="h1"
        fontSize={{ base: '2xl', md: '4xl' }}
        textAlign={'center'}
        mb={5}
      >
        About Our Documentation System
      </Heading>
      <Field.Text
        name="aboutTopBlock"
        defaultValue="We have leveraged the power of Jaen CMS and MDX to bring you a superior documentation experience."
        fontSize={{ base: 'md', md: 'lg' }}
        textAlign={'center'}
        mb={10}
      />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box>
          <Heading as="h2" fontSize="2xl" mb={5}>
            Why Jaen CMS?
          </Heading>
          <Field.Text
            name="aboutLeftBlock"
            defaultValue="Jaen CMS allows us to build, manage and deliver documentation like never before. It's highly flexible and provides a better content management experience."
          />
        </Box>
        <Box>
          <Heading as="h2" fontSize="2xl" mb={5}>
            Why MDX?
          </Heading>
          <Field.Text
            name="aboutRightBlock"
            defaultValue="MDX lets us write JSX embedded in markdown documents. This makes it possible to create interactive documentation and helps us deliver a better user experience."
          />
        </Box>
      </SimpleGrid>
    </BaseContentLayout>
  );
};

export default AboutContent;
1;
