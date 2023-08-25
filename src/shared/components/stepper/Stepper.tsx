import { Box, Divider, HStack, StackProps, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { TStepperSection } from './types/stepper';
import StepperItem from './StepperItem';

export const stepperStyling = {
  wrapper: {
    spacing: 0
  },
  title: {
    vstack: {
      spacing: 0,
      w: 'full'
    },
    hstack: {
      w: 'full',
      mb: 3
    },
    divider: {
      flex: 1
    }
  }
};

interface IStepperProps extends StackProps {
  sections: TStepperSection[];
}

/**
 * Component for displaying a stepper.
 */
const Stepper: FC<IStepperProps> = ({ sections, ...props }) => {
  return (
    <VStack w="full" {...stepperStyling.wrapper} {...props}>
      {sections.map((section, i) => {
        return (
          <VStack key={i} spacing={0} w="full" h="max-content">
            <HStack w="full" mb={3}>
              <Box {...section.titleProps}>{section.title}</Box>
              <Divider flex={1} h="full" />
            </HStack>
            {section.items.map((item, j) => (
              <StepperItem
                key={j}
                {...item}
                // This places some padding to the next section (except for the last section)
                props={
                  j === section.items.length - 1 && i < sections.length - 1
                    ? { pb: 10 }
                    : {}
                }
              />
            ))}
          </VStack>
        );
      })}
    </VStack>
  );
};

export default Stepper;
