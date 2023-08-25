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
      <Menu
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
          <Icon
            as={isLightColorMode ? SunIcon : MoonIcon}
            mr={isExpanded ? 2 : 0}
          />
          {isExpanded && (isLightColorMode ? 'Light' : 'Dark')}
        </MenuButton>
        <MenuList>
          <MemoizedColorModeMenuItems
            currentColorMode={colorMode}
            toggleColorMode={toggleColorMode}
          />
        </MenuList>
      </Menu>
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
          onClick={() => setIsExpanded(!isExpanded)}
        />
      )}
    </Flex>
  );
};

/**
 * Memoized color mode menu items.
 */
const colorModes = ['Light', 'Dark', 'System'];
//TODO: Fix system color mode toggle (doesnt work - doesnt stay in sync with system)
const MemoizedColorModeMenuItems = React.memo<{
  currentColorMode: ColorMode;
  toggleColorMode: () => void;
}>(
  ({ currentColorMode, toggleColorMode }) => {
    return (
      <>
        {colorModes.map((mode, i) => {
          const isCurrentColorMode =
            currentColorMode === mode.toLocaleLowerCase();
          return (
            <MenuItem
              key={i}
              position="relative"
              disabled={isCurrentColorMode}
              onClick={
                !isCurrentColorMode && mode === 'light'
                  ? toggleColorMode
                  : undefined
              }
            >
              {mode}
              {isCurrentColorMode && (
                <CheckIcon
                  position="absolute"
                  right={3}
                  top="50%"
                  transform="translateY(-50%)"
                  boxSize="10px"
                />
              )}
            </MenuItem>
          );
        })}
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.currentColorMode === nextProps.currentColorMode
);

export default NavbarControls;
