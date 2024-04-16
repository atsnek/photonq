import { SunIcon, MoonIcon, CheckIcon } from '@chakra-ui/icons';
import {
  useColorMode,
  Flex,
  Menu,
  MenuButton,
  Button,
  Icon,
  MenuList,
  IconButton,
  ColorMode,
  MenuItem,
  FlexProps
} from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction } from 'react';
import React from 'react';
import HideSidebarIcon from '../../../components/icons/HideSidebar';
import ThemeChooser from '../../../components/theme-chooser/ThemeChooser';

interface NavbarControlsProps {
  isMobile?: boolean;
  isExpanded?: boolean;
  setIsExpanded?: Dispatch<SetStateAction<boolean>>;
}
/**
 * The navbar controls including the expand/collapse and color mode toggle button.
 */
const NavbarControls: FC<NavbarControlsProps> = ({
  isMobile = false,
  isExpanded,
  setIsExpanded
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const conditional_props: FlexProps = {};
  if (isMobile) {
    isExpanded = true;
    conditional_props.bgColor = 'shared.body.bgColor';
  }

  const isLightColorMode = colorMode === 'light';
  const showExpandToggle = !isMobile && setIsExpanded;
  return (
    <Flex
      w="100%"
      borderTop={isExpanded ? '1px solid' : undefined}
      borderTopColor="components.separator.borderColor"
      pt={5}
      pb={isMobile ? 5 : 0}
      gap={3}
      flexDir={isExpanded ? 'row' : 'column'}
      alignItems="center"
      {...conditional_props}
    >
      <ThemeChooser
        menuProps={{ matchWidth: isMobile }}
        buttonIconProps={{ mr: isExpanded ? 2 : 0 }}
        buttonContent={isExpanded && (isLightColorMode ? 'Light' : 'Dark')}
      />
      {/* <Menu
        id="navbar-color-mode-menu"
        placement="top"
        matchWidth={isMobile || !showExpandToggle}
        isLazy
      >
        <MenuButton
          as={Button}
          size="sm"
          flexGrow={1}
          variant="ghost-hover"
          textAlign="left"
          color="shared.text.default"
        >
          <Icon as={isLightColorMode ? SunIcon : MoonIcon} mr={isExpanded ? 2 : 0} />
          {isExpanded && (isLightColorMode ? 'Light' : 'Dark')}
        </MenuButton>
        <MenuList>
          <MemoizedColorModeMenuItems
            currentColorMode={colorMode}
            toggleColorMode={toggleColorMode}
          />
        </MenuList>
      </Menu> */}
      {showExpandToggle && (
        <IconButton
          icon={
            <HideSidebarIcon
              transform={!isExpanded ? 'rotate(180deg)' : undefined}
              transition="transform 0.2s ease-in-out"
            />
          }
          aria-label={`${isExpanded ? 'Close' : 'Open'}`}
          size="sm"
          variant="ghost"
          color="shared.text.default"
          onClick={() => setIsExpanded(!isExpanded)}
        />
      )}
    </Flex>
  );
};

export default NavbarControls;
