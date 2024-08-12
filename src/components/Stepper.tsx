import {
  Box,
  Center,
  Divider,
  HStack,
  LinkBox,
  LinkOverlay,
  StackProps,
  Text,
  VStack
} from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';
import React, { FC } from 'react';

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

interface TStepperItem {
  title: string;
  children?: React.ReactNode;
  icon: React.ReactNode;
  to?: string;
}

interface IStepperProps extends StackProps {
  sections: {
    title: string;
    titleProps?: StackProps;
    items: TStepperItem[];
  }[];
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
  to,
  props
}) => {
  return (
    <HStack
      as={LinkBox}
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

      {to ? (
        <LinkOverlay as={Link} to={to} w="full">
          {title}
        </LinkOverlay>
      ) : (
        <Text w="full">{title}</Text>
      )}
    </HStack>
  );
};
