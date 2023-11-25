import { SunIcon, MoonIcon, CheckIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  Button,
  Icon,
  MenuList,
  MenuProps,
  useColorMode,
  IconProps,
  ColorMode,
  MenuItem,
  ButtonProps,
  LightMode,
  DarkMode
} from '@chakra-ui/react';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';

interface IThemeChooserProps {
  menuProps?: Partial<MenuProps>;
  buttonProps?: Partial<ButtonProps>;
  buttonIconProps?: IconProps;
  buttonContent?: ReactNode;
  forceMenuColorMode?: ColorMode;
}

/**
 * The theme toggle component including a menu with the available theme options.
 */
const ThemeChooser: FC<IThemeChooserProps> = ({
  menuProps,
  buttonProps,
  buttonIconProps,
  buttonContent,
  forceMenuColorMode
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isLightColorMode = colorMode === 'light';

  const menuList = (() => {
    const list = (
      <MenuList>
        <MemoizedColorModeMenuItems
          currentColorMode={colorMode}
          toggleColorMode={toggleColorMode}
        />
      </MenuList>
    );
    if (!forceMenuColorMode) {
      return list;
    }

    if (forceMenuColorMode === 'dark') {
      return <DarkMode>{list}</DarkMode>;
    }
    return <LightMode>{list}</LightMode>;
  })();

  return (
    <Menu id="navbar-color-mode-menu" placement="top" {...menuProps} isLazy>
      <MenuButton
        as={Button}
        size="sm"
        flexGrow={1}
        variant="ghost-hover"
        textAlign="left"
        color="shared.text.default"
        {...buttonProps}
      >
        <Icon as={isLightColorMode ? SunIcon : MoonIcon} {...buttonIconProps} />
        {buttonContent}
      </MenuButton>
      {menuList}
    </Menu>
  );
};

const colorModes = ['Light', 'Dark', 'System'];
//TODO: Fix system color mode toggle (doesnt work - doesnt stay in sync with system)
/**
 * Memoized color mode menu items.
 */
const MemoizedColorModeMenuItems = memo<{
  currentColorMode: ColorMode;
  toggleColorMode: () => void;
}>(
  ({ currentColorMode, toggleColorMode }) => {
    return (
      <>
        {colorModes.map((mode, i) => {
          const isCurrentColorMode = currentColorMode === mode.toLocaleLowerCase();
          return (
            <MenuItem
              key={i}
              position="relative"
              disabled={isCurrentColorMode}
              onClick={!isCurrentColorMode ? toggleColorMode : undefined}
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
  (prevProps, nextProps) => prevProps.currentColorMode === nextProps.currentColorMode
);

export default ThemeChooser;
