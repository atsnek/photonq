import { Box, Center, HStack, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface ICodeResultPreviewProps {
  isStandalone?: boolean;
  headerText?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

const DiagramPreview: FC<ICodeResultPreviewProps> = ({
  isStandalone,
  headerText,
  children
}) => {
  let baseProps = {};

  if (isStandalone)
    baseProps = {
      mt: '8'
    };

  return (
    <Box
      {...baseProps}
      color="components.codeResultPreview.text.color"
      borderRadius={isStandalone ? 'md' : 'none'}
      border="1px solid"
      borderColor="components.codeResultPreview.borderColor"
      // Clips the white body below to the rounded corners.
      overflow="hidden"
    >
      {headerText && (
        <Text
          fontSize="xs"
          my="auto"
          bgColor="components.codeResultPreview.header.bgColor"
          color="components.codeResultPreview.header.text.color"
          _hover={{
            color: 'components.codeResultPreview.header._hover.text.color'
          }}
          transition="color 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
          p={3}
        >
          {headerText}
        </Text>
      )}
      {/* White in both modes. quantum-circuit draws its wires, qubit labels
          and captions in hard-coded black and dark grey, so on the dark card
          in dark mode only the white gate boxes could be seen. The drawing is
          a figure made for a white page, so it gets one. */}
      <Box
        p="1"
        bg="white"
        color="gray.800"
        maxH={{
          base: 'xs',
          sm: 'sm',
          md: 'md',
          lg: 'lg'
        }}
        overflowY="scroll"
      >
        {children}
      </Box>
    </Box>
  );
};

export default DiagramPreview;
