import { FC } from 'react';
import { TActionToolbarItem } from './types/actionToolbar';
import { HStack, Tooltip, IconButton, Box, Divider } from '@chakra-ui/react';

interface IActionTOolbarProps {
  actions: TActionToolbarItem[];
  active?: boolean;
  compactMode?: boolean;
}

const ActionToolbar: FC<IActionTOolbarProps> = ({
  actions,
  active = true,
  compactMode
}) => {
  if (actions.length === 0) return null;
  const items = actions
    .sort((a, b) => {
      if (a.order === undefined && b.order === undefined) return 0;
      if (a.order === undefined) return 1;
      if (b.order === undefined) return -1;
      return a.order - b.order;
    })
    .map((item, index) => {
      // We can distinguish between actions and dividers by checking for the onClick prop existence
      if ('onClick' in item) {
        return (
          <Tooltip
            key={index}
            label={item.tooltip}
            placement="top"
            marginBottom={1}
          >
            <IconButton
              icon={item.icon}
              fontSize="xl"
              size="md"
              aria-label={item.ariaLabel}
              variant="ghost"
              borderRadius="full"
              onClick={item.onClick}
              color="components.actionToolbar.button.color"
              {...item.buttonProps}
              _hover={{
                bgColor: 'components.actionToolbar.button._hover.bgColor',
                color:
                  item.hoverColor ??
                  'components.actionToolbar.button._hover.color',
                ...item.buttonProps?._hover
              }}
              isDisabled={item.disabled}
              transition={`background-color 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease-in-out ${
                index * 0.05
              }s`}
              transform={compactMode ? 'translateY(50px)' : undefined}
            />
          </Tooltip>
        );
      }

      // Otherwise, it's a divider
      return (
        <Divider
          key={index}
          orientation="vertical"
          h={5}
          borderColor="components.actionToolbar.divider.borderColor"
          opacity={1}
          {...item.style}
        />
      );
    });

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
      opacity={active ? 1 : 0}
      transform={'translateX(-50%)' + (active ? '' : ' translateY(20px)')}
      spacing={3}
      width={compactMode ? '58px' : undefined}
      transition="opacity 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000), transform 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000), width 0.5s 0.2s"
      __css={
        compactMode
          ? {
              '&:hover': {
                width: '',
                button: {
                  position: 'relative',
                  transform: 'translateY(0)'
                }
              }
            }
          : undefined
      }
      overflow="hidden"
    >
      {items}
    </HStack>
  );
};

export default ActionToolbar;
