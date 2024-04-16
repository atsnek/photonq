import { LinkProps } from '@chakra-ui/react';
import { Link as JaenLink } from 'gatsby-plugin-jaen';
import { ReactNode, forwardRef } from 'react';

interface GatsbyLinkProps extends LinkProps {
  href?: string;
  children?: ReactNode;
}

/**
 * Custom link component combining Chakra UI's and Gatsby's Link.
 */

const Link = forwardRef<typeof JaenLink, GatsbyLinkProps>(({ href = '#', ...props }, ref) => {
  return <JaenLink ref={ref as any} to={href} {...props} />;
});

export default Link;
