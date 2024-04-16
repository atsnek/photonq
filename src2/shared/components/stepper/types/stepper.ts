import { BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

/**
 * A stepper section consisting of multiple stepper items
 */
export type TStepperSection = {
  title: ReactNode;
  titleProps?: BoxProps;
  items: TStepperItem[];
};

/**
 * A single stepper item
 */
export type TStepperItem = {
  icon: ReactNode;
  title: ReactNode;
  children?: ReactNode;
};
