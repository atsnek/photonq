import * as React from 'react';
import { Link, HeadFC, PageProps } from 'gatsby';
import { PageConfig } from '@atsnek/jaen';
import { LightMode, GlobalStyle, Progress, Center } from '@chakra-ui/react';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';

function VennDiagram() {
  const vennBaseSize = useBreakpointValue({ base: '100px', md: '200px' });

  return (
    <Flex as="main" justifyContent="center" alignItems="center" height="100vh">
      <Grid
        templateColumns={`repeat(3, ${vennBaseSize})`}
        templateAreas="'left center right'"
        gap={4}
      >
        <GridItem
          gridArea="left"
          display="flex"
          alignItems="center"
          borderRadius="50%"
          bgColor="secondary"
          border="2px solid rgba(0, 0, 0, 0.2)"
          boxShadow={`inset ${vennBaseSize} 0 var(--secondary)`}
        >
          <Text
            fontSize="xl"
            fontWeight="lighter"
            textShadow="0 3px 18px rgba(0, 0, 0, 0.84)"
            color="primary-text-on-secondary"
          >
            We broke Something
          </Text>
        </GridItem>
        <GridItem
          gridArea="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontSize={{ base: '2xl', md: '4xl' }}
            color="primary-text-on-primary"
          >
            404
          </Text>
        </GridItem>
        <GridItem
          gridArea="right"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          borderRadius="50%"
          border="2px solid rgba(0, 0, 0, 0.2)"
          boxShadow={`inset calc(${vennBaseSize} * -1) 0 var(--tertiary)`}
          mixBlendMode="hard-light"
          bgColor="tertiary"
        >
          <Text
            fontSize="xl"
            fontWeight="lighter"
            textShadow="0 3px 18px rgba(0, 0, 0, 0.84)"
            color="primary-text-on-tertiary"
          >
            You cannot type!
          </Text>
        </GridItem>
      </Grid>
    </Flex>
  );
}

function ErrorDescription() {
  const vennBaseSize = useBreakpointValue({ base: '100px', md: '200px' });

  return (
    <Box as="div" width="100%" maxW={`calc(${vennBaseSize} * 2)`}>
      <Heading
        fontSize="lg"
        paddingBottom="2"
        marginBottom="4"
        textAlign="center"
        borderBottom="1px solid var(--border-on-light)"
      >
        Error: 404 - Page Not Found
      </Heading>
      <Box color="disabled-text-on-light">
        <Text>You might be here because:</Text>
        <List styleType="disc" listStylePosition="inside" paddingTop="2">
          <ListItem>The page has moved</ListItem>
          <ListItem>The page no longer exists</ListItem>
          <ListItem>You were looking for your kittens and got lost</ListItem>
          <ListItem>You like 404 pages</ListItem>
        </List>
      </Box>
    </Box>
  );
}

const NotFoundPage: React.FC<PageProps> = () => {
  const [isMounted, setIsMounted] = React.useState(false);

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
    <Flex flexDirection="column" alignItems="center">
      <VennDiagram />
      <ErrorDescription />
    </Flex>
  );
};

export default NotFoundPage;

export { Head } from '@atsnek/jaen';

export const pageConfig: PageConfig = {
  label: 'Oops! Page not found',
  childTemplates: []
};
