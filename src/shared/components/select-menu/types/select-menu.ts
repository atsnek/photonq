import { MenuItemProps } from "@chakra-ui/react";

/**
 * Type for a single select menu item
 */
export type SelectMenuItem = {
    label: string;
    value: string;
    icon?: string;
    disabled?: boolean;
    selected?: boolean;
    onClick?: () => void;
    style?: MenuItemProps;
}