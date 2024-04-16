import { FC } from 'react';
import { TStepperItem } from './types/stepper';
import { Box, Center, HStack, StackProps } from '@chakra-ui/react';

interface IStepperItemProps extends TStepperItem {
  props?: StackProps;
}

/**
 * Component for displaying a single stepper item.
 */
const StepperItem: FC<IStepperItemProps> = ({
  title,
  children,
  icon,
  props
}) => {
  return (
    <HStack
      w="full"
      h="100%"
      py={3}
      position="relative"
      _before={{
        position: 'absolute',
        left: '15px',
        top: 'auto',
        content: '""',
        w: '2px',
        h: '100%',
        bgColor: 'components.stepper.item.vr.bgColor',
        zIndex: -1
      }}
      {...props}
    >
      <Box
        as={Center}
        boxSize="32px"
        bgColor="components.stepper.item.icon.wrapper.bgColor"
        borderRadius="full"
        fontSize="16px"
        border="3px solid"
        borderColor="chakra-body-bg"
        color="components.stepper.item.icon.color"
      >
        {icon}
      </Box>
      <Box w="full">{title}</Box>
      <Box>{children}</Box>
    </HStack>
  );
};

export default StepperItem;
