import { Box, ButtonSpinner, Center, HStack, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { mainComponentBaseStyle } from '../../../../shared/containers/main/mainContent.vars';

interface ICodeResultPreviewProps {
  result?: ReactNode;
  isStandalone?: boolean;
  headerText?: string;
  headerTextRight?: string;

  isExecuting?: boolean;
}

const CodeResultPreview: FC<ICodeResultPreviewProps> = ({
  result,
  isStandalone,
  headerText,
  headerTextRight,
  isExecuting
}) => {
  let baseProps = {};

  if (isStandalone) baseProps = mainComponentBaseStyle.baseProps;

  return (
    <Box
      {...baseProps}
      mt={4}
      color="components.codeResultPreview.text.color"
      borderRadius={isStandalone ? 'md' : 'none'}
      border="1px solid"
      borderColor="components.codeResultPreview.borderColor"
    >
      {headerText && (
        <HStack
          justifyContent="space-between"
          w="full"
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
          <Text>{headerText}</Text>

          <Text>{headerTextRight}</Text>
        </HStack>
      )}
      <Box p={3}>
        {isExecuting ? (
          <Center my={5}>
            <ButtonSpinner
              boxSize="20px"
              color="components.codeResultPreview.loadingSpinner.color"
            />
          </Center>
        ) : (
          <>
            {result ? (
              result
            ) : (
              <Center my={5}>
                <Text
                  fontSize="sm"
                  color="components.codeResultPreview.noResult.text.color"
                >
                  Not run yet
                </Text>
              </Center>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default CodeResultPreview;
