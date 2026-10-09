import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import { FC, ReactNode } from 'react';

/**
 * jaen-fields-mdx's default docs link, with the colour on the site's text
 * token.
 *
 * The package renders every Markdown link in `brand.600` in both modes. That
 * is photonq's dark blue, 6.5:1 on the white page and 2.4:1 on the gray.800
 * page in dark mode, where the docs links and the reference lists turned
 * close to unreadable. The package cannot be changed from here, but MdxField
 * spreads the site's components over its own, so an `a` from the site wins.
 * The look is the package's: no underline at rest, a 2px bar growing in from
 * the left on hover, in the link's own colour.
 */
const linkProps: LinkProps = {
  position: 'relative',
  color: 'shared.text.brand',
  textDecoration: 'none',
  w: 'fit-content',
  _hover: {
    color: 'shared.text.brand',
    _before: {
      transform: 'scaleX(1)'
    }
  },
  _before: {
    content: '""',
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: '2px',
    bottom: '-2px',
    left: 0,
    backgroundColor: 'currentColor',
    transform: 'scaleX(0)',
    transformOrigin: 'top left',
    transition: 'transform 0.3s ease'
  }
};

interface ILinkProps {
  href?: string;
  isExternal?: boolean;
  children?: ReactNode;
}

/**
 * Component for displaying a link (in the main content)
 */
const Link: FC<ILinkProps> = ({ href = '/', children, ...props }) => {
  const isExternal =
    props.isExternal !== undefined
      ? props.isExternal
      : href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <ChakraLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...linkProps}
      >
        {children}
      </ChakraLink>
    );
  }

  return (
    <ChakraLink {...linkProps} asChild>
      <GatsbyLink to={href}>{children}</GatsbyLink>
    </ChakraLink>
  );
};

export default Link;
