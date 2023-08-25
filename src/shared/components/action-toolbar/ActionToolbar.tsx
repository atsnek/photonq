import { FC } from 'react';
import { TActionToolbarItem } from './types/actionToolbar';
import { HStack, Tooltip, IconButton } from '@chakra-ui/react';

interface IActionTOolbarProps {
  actions: TActionToolbarItem[];
  active?: boolean;
}

const ActionToolbar: FC<IActionTOolbarProps> = ({ actions, active = true }) => {
  const items = actions.map((action, index) => (
    <Tooltip
      key={index}
      label={action.tooltip}
      placement="top"
      marginBottom={1}
    >
      <IconButton
        icon={action.icon}
        fontSize="xl"
        size="md"
        aria-label={action.ariaLabel}
        variant="ghost"
        borderRadius="full"
        onClick={action.onClick}
        color="components.actionToolbar.button.color"
        {...action.buttonProps}
        _hover={{
          bgColor: 'components.actionToolbar.button._hover.bgColor',
          color:
            action.hoverColor ?? 'components.actionToolbar.button._hover.color',
          ...action.buttonProps?._hover
        }}
        transition="background-color 0.2s ease-in-out, color 0.2s ease-in-out"
      />
    </Tooltip>
  ));

  return (
    <HStack
      position="fixed"
      zIndex={active ? 10 : -1} // Hide when inactive (visibility or display skips transitions - sort of an escape hatch)
      bottom={10}
      left="50%"
      bgColor="components.actionToolbar.container.bgColor"
      border="1px solid"
      borderColor="components.actionToolbar.container.borderColor"
      px={10}
      py={2}
      borderRadius="full"
      spacing={3}
      opacity={active ? 1 : 0}
      transform={'translateX(-50%)' + (active ? '' : ' translateY(20px)')}
      transition="opacity 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000), transform 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
    >
      {items}
    </HStack>
  );
};

export default ActionToolbar;
