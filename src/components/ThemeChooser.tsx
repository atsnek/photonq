// v3 dropped colour mode out of @chakra-ui/react altogether (it is next-themes
// now), so ColorMode, DarkMode, LightMode and useColorMode come from jaen's
// re-export instead of from chakra, where v2 had them.
import { ColorMode, DarkMode, LightMode, useColorMode } from 'jaen';
import { CheckIcon, MoonIcon, SunIcon } from './icons/chakra';
import {
  Button,
  ButtonProps,
  Icon,
  IconProps,
  Menu,
  MenuRootProps
} from '@chakra-ui/react';
import { FC, ReactNode, memo } from 'react';

interface IThemeChooserProps {
  menuProps?: Partial<MenuRootProps>;
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
    // No portal, as in v2. DarkMode and LightMode are DOM elements in v3, and
    // a portal would drop the list outside the one wrapping it here, which is
    // the whole of forceMenuColorMode.
    const list = (
      <Menu.Positioner>
        <Menu.Content>
          <MemoizedColorModeMenuItems
            currentColorMode={colorMode}
            toggleColorMode={toggleColorMode}
          />
        </Menu.Content>
      </Menu.Positioner>
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
    <Menu.Root
      id="navbar-color-mode-menu"
      {...menuProps}
      lazyMount
      unmountOnExit
      positioning={{
        placement: 'top'
      }}
    >
      <Menu.Trigger asChild>
        <Button
          size="sm"
          flexGrow={1}
          // One of the site's own button variants (styles/theme/recipes.ts),
          // and no assertion is needed for it: postinstall runs
          // `chakra typegen`, so ButtonProps['variant'] already names it.
          variant="ghost-hover"
          textAlign="left"
          color="shared.text.default"
          {...buttonProps}
        >
          <Icon
            as={isLightColorMode ? SunIcon : MoonIcon}
            {...buttonIconProps}
          />
          {buttonContent}
        </Button>
      </Menu.Trigger>
      {menuList}
    </Menu.Root>
  );
};

const colorModes = ['Light', 'Dark', 'System'];
// TODO: the System row still cannot be chosen. All three rows call
// toggleColorMode, which only ever writes 'light' or 'dark', and the check is
// against currentColorMode, which is the RESOLVED mode ('light' | 'dark') — so
// System never selects system and never shows the tick. That is v2's behaviour
// verbatim and is left alone here on purpose, this pass being a like-for-like
// v3 migration. The original reason recorded for it no longer holds: once
// 'system' IS set, next-themes keeps it in sync with the OS through a
// matchMedia listener. Fixing it needs
// onSelect={() => setColorMode(mode.toLocaleLowerCase())} plus the preference
// (next-themes' `theme`) rather than the resolved mode to compare against,
// which the jaen seam does not hand out yet.
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
          const isCurrentColorMode =
            currentColorMode === mode.toLocaleLowerCase();
          return (
            <Menu.Item
              key={i}
              position="relative"
              disabled={isCurrentColorMode}
              onSelect={!isCurrentColorMode ? toggleColorMode : undefined}
              // The codemod stamped the literal "item-0" on all three. In v3
              // the value IS the item's DOM id (zag builds `${menuId}/${value}`
              // and resolves both the select listener and the highlight by
              // getElementById), so three identical values collapse the rows
              // onto one node: all three paint data-highlighted together and
              // only the first one's handler ever fires. The lowercased mode
              // name is the same stable key the selected check compares on.
              value={mode.toLocaleLowerCase()}
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
            </Menu.Item>
          );
        })}
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.currentColorMode === nextProps.currentColorMode
);

export default ThemeChooser;
