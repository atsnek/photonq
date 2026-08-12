import {
  Box,
  Center,
  HStack,
  LinkBox,
  LinkOverlay,
  StackProps,
  Text,
  VStack,
  Separator
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
          <VStack key={i} gap={0} w="full" h="max-content">
            <HStack w="full" mb={3}>
              <Box {...section.titleProps}>{section.title}</Box>
              <Separator flex={1} h="full" />
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
      asChild
    >
      <LinkBox>
        <Box
          boxSize="32px"
          bgColor="components.stepper.item.icon.wrapper.bgColor"
          borderRadius="full"
          fontSize="16px"
          border="3px solid"
          // v2 built-in, gone in v3. `chakra-body-bg` was
          // {_light: white, _dark: gray.800}, and `shared.body.bgColor` is the
          // same pair — semanticTokens/shared.ts says so in as many words. The
          // ring punches the icon out of the connector line drawn above, so
          // losing it to currentColor inverted the cut-out.
          borderColor="shared.body.bgColor"
          color="components.stepper.item.icon.color"
          asChild
        >
          <Center>{icon}</Center>
        </Box>

        {to ? (
          <LinkOverlay w="full" asChild>
            <Link to={to}>{title}</Link>
          </LinkOverlay>
        ) : (
          <Text w="full">{title}</Text>
        )}
      </LinkBox>
    </HStack>
  );
};
