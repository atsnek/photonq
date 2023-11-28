import {
  Button,
  ButtonProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  MenuListProps
} from '@chakra-ui/react';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { SelectMenuItem } from './types/select-menu';
import { CheckIcon } from '@chakra-ui/icons';

interface ISelectMenu {
  items: SelectMenuItem[];
  itemProps?: MenuItemProps;
  listProps?: MenuListProps;
  onChange?: (value: string) => void;
  defaultValue?: string;
  buttonLabel?: string;
  buttonProps?: ButtonProps;
}

/**
 * A select component that uses a menu to display the options the user can choose from.
 */
const SelectMenu: FC<ISelectMenu> = ({
  items: initItems,
  itemProps,
  listProps,
  onChange,
  defaultValue,
  buttonProps,
  buttonLabel
}) => {
  console.log('initItems: ', initItems);
  const [items, setItems] = useState<SelectMenuItem[]>(initItems);

  useEffect(() => {
    // const itemsChanged =
    //   items.length !== initItems.length ||
    //   items.some((item, idx) => {
    //     if (initItems[idx] === undefined) return true;
    //     for (const key in item) {
    //       if (item[key as keyof typeof item] !== initItems[idx][key as keyof typeof item])
    //         return true;
    //     }
    //     return false;
    //   });
    // if (!itemsChanged) return;
    // console.log('items changed', items);
    const itemsCopy = initItems.slice();
    // Set the active item to selected if it is not already selected.
    const activeItemIdx = items.findIndex(item => item.value === defaultValue);
    if (
      !itemsCopy.find(i => i.selected) &&
      activeItemIdx !== -1 &&
      !itemsCopy[activeItemIdx]?.selected
    ) {
      itemsCopy[activeItemIdx].selected = true;
    }
    setItems(itemsCopy);
  }, []);

  const menuItems = useMemo(() => {
    return items.map((item, index) => {
      return (
        <MenuItem
          key={index}
          onClick={() => {
            if (onChange) onChange(item.value);
            const newItems = initItems.slice();
            newItems[index] = { ...newItems[index], selected: true };

            const previousItem = items.find(i => i.selected);
            if (previousItem) previousItem.selected = false;
            setItems(newItems);
          }}
          position="relative"
          w="full"
          pr={10}
          {...itemProps}
        >
          {item.label}
          {item.selected && (
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
    });
  }, [items]);

  return (
    <Menu matchWidth isLazy>
      <MenuButton as={Button} color="shared.text.default" {...buttonProps}>
        {items.find(i => i.selected)?.label ?? buttonLabel}
      </MenuButton>
      <MenuList {...listProps}>{menuItems}</MenuList>
    </Menu>
  );
};

export default SelectMenu;
