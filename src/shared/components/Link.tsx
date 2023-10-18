import { Link as ChLink, LinkProps, Text } from '@chakra-ui/react';
import { Link as GaLink } from 'gatsby';
import { FC, ReactNode, forwardRef } from 'react';
import { isInternalLink } from '../utils/utils';
import { useLocation } from '@reach/router';
import { Link as JaenLink } from 'gatsby-plugin-jaen';

interface GatsbyLinkProps extends LinkProps {
  href?: string;
  children?: ReactNode;
}

/**
 * Custom link component combining Chakra UI's and Gatsby's Link.
 */

const Link = forwardRef<typeof JaenLink, GatsbyLinkProps>(
  ({ href = '#', ...props }, ref) => {
    console.log('Link href', href, props);

    return <JaenLink ref={ref as any} to={href} {...props} />;
  }
);

export default Link;
