import { IconButtonProps, TooltipProps } from "@chakra-ui/react";

export type TActionToolbarItem = {
    icon: IconButtonProps['icon'];
    ariaLabel: string;
    onClick: () => void;
    disabled?: boolean;
    tooltip?: string;
    tooltipProps?: TooltipProps;
    buttonProps?: Partial<IconButtonProps>;
    hoverColor?: IconButtonProps['color'];
}