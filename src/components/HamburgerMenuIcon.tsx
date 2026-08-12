import { Box, BoxProps } from '@chakra-ui/react';
import { FC, MouseEventHandler } from 'react';

export type THamburgerMenuIconStylerProps = BoxProps;

interface IHamburgerMenuIconProps {
  handleClick?: (isOpen: boolean) => void;
  wrapperProps?: BoxProps;
  iconProps?: BoxProps;
}

/**
 * Component for a reactive hamburger icon.
 */
const HamburgerMenuIcon: FC<IHamburgerMenuIconProps> = ({
  handleClick,
  wrapperProps,
  iconProps
}) => {
  const props = {
    css: {
      '&.open': {
        '& > div:nth-of-type(1)': {
          top: '8px',
          transform: 'rotate(45deg)'
        },
        '& > div:nth-of-type(2)': {
          opacity: 0
        },
        '& > div:nth-of-type(3)': {
          top: '8px',
          transform: 'rotate(-45deg)'
        }
      },
      '& > div': {
        transition:
          'transform 0.2s ease-in-out, opacity 0.2s ease-in-out, top 0.2s ease-in-out, background-color 0.2s ease-in-out'
      },
      ...wrapperProps?.css
    },
    // The trailing spread lets a caller's own css win outright over the merge
    // above instead of extending it. Same as under v2's __css; kept so the
    // rendered styles do not shift, not because it is what one would write.
    ...wrapperProps
  };

  return (
    <Box
      position="relative"
      boxSize="11px"
      // handleClick is declared as (isOpen: boolean) but has always been wired
      // straight to onClick, so it receives the click event, never a flag. The
      // callers ignore the argument; unwinding that is a behaviour change.
      onClick={handleClick as unknown as MouseEventHandler<HTMLDivElement>}
      {...props}>
      <Box
        position="absolute"
        top={0}
        w="11px"
        h="2px"
        backgroundColor="topNav.mobile.hamburger.bgColor"
        borderRadius="full"
        {...iconProps}
      />
      <Box
        position="absolute"
        top="5px"
        w="11px"
        h="2px"
        backgroundColor="topNav.mobile.hamburger.bgColor"
        borderRadius="full"
        {...iconProps}
      />
      <Box
        position="absolute"
        top="10px"
        w="11px"
        h="2px"
        backgroundColor="topNav.mobile.hamburger.bgColor"
        borderRadius="full"
        {...iconProps}
      />
    </Box>
  );
};

export default HamburgerMenuIcon;
