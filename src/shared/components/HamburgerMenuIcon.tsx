import { Box, BoxProps } from '@chakra-ui/react';
import { FC, useState } from 'react';

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
    __css: {
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
      ...wrapperProps?.__css
    },
    ...wrapperProps
  };

  return (
    <Box position="relative" boxSize="11px" onClick={handleClick} {...props}>
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
