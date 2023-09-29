import * as React from 'react';
import { PageProps } from 'gatsby';
import { PageConfig } from '@atsnek/jaen';
import {
  Progress,
  Center,
  Divider,
  UnorderedList,
  useColorModeValue
} from '@chakra-ui/react';

import { Box, Grid, GridItem, Heading, ListItem, Text } from '@chakra-ui/react';
import { useNavOffset } from '../shared/hooks/use-nav-offset';

//TODO: Find a way to hide the gradient on smaller devices (has to do with the background of the right circle)
function VennDiagram() {
  const redColor = useColorModeValue('#f53b57', '#b32b3f');
  return (
    <Center>
      <Grid
        templateColumns={{
          base: 'repeat(3, 3.125rem)',
          sm: 'repeat(3, 6.25rem)',
          md: 'repeat(3, 12.5rem)'
        }}
        gridTemplateAreas="'left center right'"
        color="white"
      >
        <GridItem
          gridRow={1}
          gridColumnStart="left"
          gridColumnEnd="center"
          bgColor={redColor}
          border="2px solid rgba(0, 0, 0, 0.2)"
          boxShadow={{
            base: 'inset 3.125rem #f53b57',
            sm: 'inset 6.25rem #f53b57',
            md: 'inset 12.5rem #f53b57'
          }}
          borderRadius="full"
          h={{ base: '6.5rem', sm: '12.5rem', md: '25rem' }}
        />
        <GridItem
          gridRow={1}
          gridColumnStart="center"
          gridColumnEnd="right"
          background="#3c40c6 repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0rem, rgba(0, 0, 0, 0) 0.0625rem, rgba(0, 0, 0, 0) 0.5rem, rgba(255, 255, 255, 0.2) 0.5625rem)"
          border="2px solid rgba(0, 0, 0, 0.2)"
          boxShadow={{
            base: 'inset -3.125rem #3c40c6',
            sm: 'inset -6.25rem #3c40c6',
            md: 'inset -12.5rem 0 #3c40c6'
          }}
          borderRadius="full"
          h={{ base: '6.25rem', sm: '12.5rem', md: '25rem' }}
          mixBlendMode="hard-light"
        />
        <GridItem
          display="flex"
          gridRow={1}
          gridColumnStart="left"
          gridColumnEnd="center"
          h="full"
          alignItems="center"
          pl={3}
        >
          <Heading
            as="h2"
            fontSize={{ sm: 'md', md: '2xl' }}
            display={{ base: 'none', sm: 'initial' }}
            maxW="50%"
            fontWeight="medium"
            textShadow="0px 0px 20px rgba(0, 0, 0, 0.28)"
          >
            We broke something
          </Heading>
        </GridItem>
        <GridItem
          gridRow={1}
          gridColumnStart="center"
          gridColumnEnd="center"
          display="flex"
          h="full"
          alignItems="center"
          justifyContent="center"
          pl={3}
          zIndex={1}
        >
          <Heading
            as="h1"
            fontSize={{ sm: 'xl', md: '5xl' }}
            display={{ base: 'none', sm: 'initial' }}
            maxW="50%"
            fontWeight="medium"
            textShadow="0px 0px 20px rgba(0, 0, 0, 0.28)"
          >
            404
          </Heading>
        </GridItem>
        <GridItem
          display="flex"
          gridRow={1}
          gridColumnStart="right"
          gridColumnEnd="right"
          h="full"
          alignItems="center"
          justifyContent="right"
          pr={3}
          zIndex={1}
        >
          <Heading
            as="h2"
            fontSize={{ sm: 'md', md: '2xl' }}
            display={{ base: 'none', sm: 'initial' }}
            maxW="75%"
            fontWeight="medium"
            textShadow="0px 0px 20px rgba(0, 0, 0, 0.28)"
            textAlign="right"
          >
            You cannot type
          </Heading>
        </GridItem>
      </Grid>
    </Center>
  );
}

function ErrorDescription() {
  const staticErrorReasons = [
    'The page has moved',
    'The page no longer exists'
  ];
  const errorReasons = [
    'The page no longer exists',
    'You were looking for kittens and got lost',
    'You are on a typo marahton. Keep trying!',
    "You tried to divide by zero. Don't do that.",
    'A Sneaky squirrel chewed our internet cables',
    'Our hamster fell asleep on the server wheel',
    'You tried to time travel to a page that doesnt exist yet',
    'Your cat walked over your keyboard',
    'A ghost in the machine got mischievous',
    'A dragon though this link was its treasure',
    'A space pirate though this link was its treasure',
    'A super-intelligent AI is testing your patience',
    "A pirate buried the page's treasure too deep",
    'A time-traveling DJ dropped the beat. Stay tuned!',
    'A wizard cast as disappearing spell. Abra-404-dabra!',
    'A time-traveling detective is solving the binary mysters'
  ];

  const reasonList = React.useMemo(() => {
    const chosenReasons = [];

    const usedIndexes: number[] = [];
    while (chosenReasons.length < 3) {
      const randomIndex = Math.floor(Math.random() * errorReasons.length);
      if (usedIndexes.includes(randomIndex)) {
        continue;
      }
      usedIndexes.push(randomIndex);
      chosenReasons.push(errorReasons[randomIndex]);
    }

    return [...staticErrorReasons, ...chosenReasons].map((reason, index) => (
      <ListItem key={index}>{reason}</ListItem>
    ));
  }, []);
  return (
    <Center>
      <Box mt={10} w={{ base: '75%', md: undefined }}>
        <Heading as="h3" size="md" mx={{ base: 0, md: 10 }} textAlign="center">
          Error 404 - Page Not Found
        </Heading>
        <Divider my={3} />
        <UnorderedList opacity={0.6}>{reasonList}</UnorderedList>
      </Box>
    </Center>
  );
}

const NotFoundPage: React.FC<PageProps> = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const topNavOffset = useNavOffset();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Center maxW="100dvh">
        <Progress size="xs" isIndeterminate />
      </Center>
    );
  }

  return (
    <Center h={`calc(100vh - ${topNavOffset})`} as="main">
      <Box>
        <VennDiagram />
        <ErrorDescription />
      </Box>
    </Center>
  );
};

export default NotFoundPage;

export { Head } from '@atsnek/jaen';

export const pageConfig: PageConfig = {
  label: 'Oops! Page not found',
  childTemplates: []
};
