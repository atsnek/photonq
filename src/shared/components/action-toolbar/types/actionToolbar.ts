import { DividerProps, IconButtonProps, TooltipProps } from '@chakra-ui/react';

type TActionToolbarItemBase = {
  order?: number;
};

export type TActionToolbarAction = {
  icon: IconButtonProps['icon'];
  ariaLabel: string;
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
  tooltipProps?: TooltipProps;
  buttonProps?: Partial<IconButtonProps>;
  hoverColor?: IconButtonProps['color'];
};

/**
 * Single item in the action toolbar
 */
export type TActionToolbarItem = TActionToolbarItemBase &
  (TActionToolbarAction | TActionToolbarDivider);

/**
 * Divider in the action toolbar
 */
export type TActionToolbarDivider = {
  style?: DividerProps;
};
