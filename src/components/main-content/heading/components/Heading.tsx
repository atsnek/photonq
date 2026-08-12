import {
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
  HeadingProps
} from '@chakra-ui/react';
import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { IMainContentComponentBaseProps } from '../../types/mainContent';
import { Link } from 'gatsby-plugin-jaen';
import FaHashtag from '../../../icons/fontawesome/FaHashtag';

/**
 * Font sizes for the anchor beside each heading.
 *
 * The `px` is not cosmetic. These were bare numeric strings ('30', '24', ...)
 * because v2's styled-system coerced a unitless number to pixels before it
 * emitted the declaration. v3 does not: an unresolvable fontSize token is
 * passed through verbatim, `font-size: 24` is invalid CSS, and the browser
 * drops the declaration at parse time. tsc and gatsby build stay green while
 * every hash icon in the docs inherits its heading's size instead.
 *
 * A flat prop is the right instrument here, unlike on the heading itself: the
 * Link recipe declares no fontSize at any breakpoint, so there is no media
 * entry for a prop to lose to. See `docsHeadingSizes` in styles/theme/recipes.
 */
const variantLinkFontSizes = {
  h1: '30px',
  h2: '24px',
  h3: '18px',
  h4: '16px',
  h5: '14px',
  h6: '12px'
};

export interface IHeadingProps
  extends IMainContentComponentBaseProps, HeadingProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  id?: string;
  noAnchor?: boolean;
  customSpacing?: ChakraHeadingProps['mt'];
  noSpacing?: boolean;
  activeLink?: boolean;
  setActiveLink?: () => void;
  children?: ReactNode;
}

/**
 * Component for displaying different heading variants and sizes.
 */
const Heading: FC<IHeadingProps> = ({
  baseProps,
  variant = 'h2',
  id,
  noAnchor,
  customSpacing,
  noSpacing,
  activeLink,
  setActiveLink,
  children,
  ...compProps
}) => {
  let props: ChakraHeadingProps = {};
  if (variant === 'h2') {
    props = {
      ...props,
      borderBottom: '1px solid',
      borderColor: 'components.separator.borderColor',
      pb: 2
    };
  }

  /**
   * Handles the click event on the heading link.
   *
   */
  const handleClick = () => {
    if (!activeLink && setActiveLink) setActiveLink();
  };

  return (
    <ChakraHeading
      {...baseProps}
      {...props}
      as={variant}
      id={id}
      /**
       * A recipe size, not a fontSize prop.
       *
       * v2 sized these headings with a flat `fontSize` prop and got away with
       * it, because v2 merged the styleConfig into the style props before
       * serialising and a scalar replaced the styleConfig's whole responsive
       * value. v3 serialises the recipe first, so its default `size: xl`
       * contributes an `@media (min-width: 48rem)` font-size that no style
       * prop can reach, whether the prop is scalar or names `md` itself.
       * Selecting a size puts the value on the same side of that boundary as
       * the recipe, which is where it always belonged.
       *
       * It stays before `compProps` on purpose: a caller passing `size` or
       * `fontSize` still wins, and now a `fontSize` from a caller wins at every
       * width, because the selected size emits no media rule for font-size.
       */
      size={variant}
      // mt={!noSpacing ? customSpacing ?? baseProps?.marginTop : 0}
      // mb="4"
      _hover={{
        '& a': {
          opacity: 1
        }
      }}
      {...compProps}
    >
      {children}
      {!noAnchor && id && (
        <Link
          to={`#${id}`}
          aria-label={`Link to ${children}`}
          position="relative"
          ml={1}
          opacity={activeLink ? 1 : 0}
          color="components.heading.link.color.default"
          fontSize={variantLinkFontSizes[variant]}
          // parseInt, not Number: the map now carries the unit, and
          // Number('24px') is NaN.
          lineHeight={parseInt(variantLinkFontSizes[variant], 10) + 5 + 'px'}
          verticalAlign="top"
          onClick={handleClick}
        >
          <FaHashtag />
        </Link>
      )}
    </ChakraHeading>
  );
};
Heading.defaultProps = {
  baseProps: {
    mt: 8
  }
};

export default Heading;
