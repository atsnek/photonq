import { PageConfig } from 'jaen';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { graphql, Link, PageProps } from 'gatsby';
import * as React from 'react';
import useNavOffset from '../hooks/use-nav-offset';

/**
 * The page for any address the site does not have.
 *
 * Without one, Cloudflare Pages served the home page for every unknown path:
 * /contact/, /users/ and typos all rendered the full front page under their
 * own address. With a 404.html in the build, Cloudflare answers those with
 * this page and a 404 status. The two client-only routes are unaffected:
 * gatsby-plugin-cloudflare-pages rewrites /experiments/:slug and
 * /users/:userId to their shells before this page is considered.
 *
 * The shape is netsnek.com's 404, in photonq's colours and in English.
 */
const NotFoundPage: React.FC<PageProps> = () => {
  // TopNav is fixed, so the page clears it the way the docs layout does.
  const offset = useNavOffset();

  return (
    <Box as="main" textAlign="center" mt={offset} py={20} px={6}>
      <Heading
        as="h1"
        size="4xl"
        display="inline-block"
        bgGradient="to-r"
        gradientFrom="brand.400"
        gradientTo="brand.600"
        backgroundClip="text"
        color="transparent"
      >
        404
      </Heading>
      <Text fontSize="lg" mt={4} mb={2}>
        Page not found
      </Text>
      <Text color="shared.text.muted" mb={8}>
        This page does not exist, or it has moved.
      </Text>
      {/* Gatsby's own Link under asChild, as in the footer: jaen's Link is a
          Chakra link and would bring the link recipe's `display: inline`
          along with it. */}
      <Button asChild>
        <Link to="/">Back to the home page</Link>
      </Button>
    </Box>
  );
};

export default NotFoundPage;

export const pageConfig: PageConfig = {
  label: 'Page not found',
  childTemplates: []
};

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
  }
`;

export { Head } from 'jaen';
