import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  ButtonSpinner,
  Center,
  Flex,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import { mainComponentBaseStyle } from '../../../../shared/containers/main/mainContent.vars';

interface ICodeResultPreviewProps {
  errors?: string[];
  warnings?: string[];
  infos?: string[];
  result?: ReactNode;
  isStandalone?: boolean;
  headerText?: string;
  headerTextRight?: string;

  isExecuting?: boolean;
}

const CodeResultPreview: FC<ICodeResultPreviewProps> = ({
  errors,
  warnings,
  result,
  infos,
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
      whiteSpace="pre-wrap"
    >
      {headerText && (
        <Stack
          flexDir={{ base: 'column', md: 'row' }}
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
        </Stack>
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
          <Stack>
            {errors && errors.length > 0 && (
              <Alert status="error" my={2}>
                <AlertIcon />
                <AlertDescription overflowX="auto">
                  <UnorderedList>
                    {errors.map((error, index) => (
                      <ListItem key={index} fontSize="sm">
                        {error}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </AlertDescription>
              </Alert>
            )}
            {warnings && warnings.length > 0 && (
              <Alert status="warning" my={2}>
                <AlertIcon />
                <AlertDescription overflowX="auto">
                  <UnorderedList>
                    {warnings.map((warning, index) => (
                      <ListItem key={index} fontSize="sm">
                        {warning}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </AlertDescription>
              </Alert>
            )}
            {infos && infos.length > 0 && (
              <Alert status="info" my={2}>
                <AlertIcon />
                <AlertDescription overflowX="auto">
                  <UnorderedList>
                    {infos.map((info, index) => (
                      <ListItem key={index} fontSize="sm">
                        {info}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </AlertDescription>
              </Alert>
            )}

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
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default CodeResultPreview;
