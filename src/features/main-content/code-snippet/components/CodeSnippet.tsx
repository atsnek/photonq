import {
  Box,
  BoxProps,
  Button,
  Flex,
  IconButton,
  Spacer,
  Text,
  transition,
  useColorModeValue
} from '@chakra-ui/react';
import React, { Dispatch, FC, SetStateAction } from 'react';
import 'highlight.js/styles/atom-one-dark.css';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { IMainContentComponentBaseProps } from '../../types/mainContent';
import { mainComponentBaseStyle } from '../../../../shared/containers/main/mainContent.vars';

export interface ICodeSnippetProps extends IMainContentComponentBaseProps {
  children?: string;
  language?: string;
  headerText?: string;
  startingLineNumber?: number;
  isStandalone?: boolean;
  isExecutable?: boolean;
  isExecuting?: boolean;
  executeCode?: (code: string) => void;
  containerProps?: BoxProps;
}

let timeout: NodeJS.Timeout;

/**
 * Code snippet component for displaying code examples.
 */
const CodeSnippet: FC<ICodeSnippetProps> = ({
  children,
  language,
  headerText,
  containerProps,
  isStandalone = true,
  isExecutable,
  isExecuting,
  executeCode,
  startingLineNumber = 1
}) => {
  const [buttonIcon, setButtonIcon] = React.useState<'copy' | 'check'>('copy');
  const theme = useColorModeValue(oneLight, oneDark);

  /**
   * Copy code to clipboard.
   */
  const copyToClipboard = () => {
    setButtonIcon('check');
    clearTimeout(timeout);
    if (children) navigator.clipboard.writeText(children);
    timeout = setTimeout(() => setButtonIcon('copy'), 2000);
  };

  let baseProps = {};
  if (isStandalone) baseProps = mainComponentBaseStyle.baseProps;

  return (
    <Box
      {...baseProps}
      w={{ base: 'calc(100vw - 3.5rem)', md: 'auto' }}
      overflow="hidden"
      border="1px solid"
      borderColor="components.codeSnippet.borderColor"
      borderRadius="xl"
      _hover={{
        boxShadow: 'md'
      }}
      transition="box-shadow 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
      {...containerProps}
    >
      <Box
        fontSize="sm"
        borderRadius="md"
        overflowX="auto"
        __css={{
          '& pre': {
            backgroundColor: 'components.codeSnippet.body.bgColor !important',
            fontFamily:
              'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
            fontWeight: 500,
            fontSize: '12.96px',
            padding: 3,
            pt: 0,
            pb: 5,
            my: '0 !important',
            minH: '100px'
          },
          '& code': {
            bgColor: 'transparent !important',
            w: 'max-content',
            display: 'block'
          },
          '&:hover .code-snippet-copy-button': {
            visibility: 'visible',
            opacity: 1
          },
          '&:hover': {
            boxShadow: 'lg'
          }
        }}
        transition="box-shadow 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
      >
        {(headerText || isExecutable) && (
          <Flex
            bgColor="components.codeSnippet.header.bgColor"
            color="components.codeSnippet.header.text.color"
            _hover={{
              color: 'components.codeSnippet.header._hover.text.color'
            }}
            transition="color 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
            p={3}
          >
            {headerText && (
              <Text fontSize="xs" my="auto">
                {headerText}
              </Text>
            )}
            {isExecutable && (
              <>
                <Spacer />
                <Button
                  size="sm"
                  colorScheme="theme"
                  my="auto"
                  _hover={{
                    transform: 'scale(1.05)'
                  }}
                  transition="transform 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
                  isLoading={isExecuting}
                  onClick={
                    executeCode && children
                      ? () => executeCode(children)
                      : undefined
                  }
                >
                  Execute
                </Button>
              </>
            )}
          </Flex>
        )}
        <Box position="relative">
          <SyntaxHighlighter
            language={language}
            style={theme}
            startingLineNumber={startingLineNumber}
            showLineNumbers
            wrapLongLines
          >
            {children ?? ''}
          </SyntaxHighlighter>
          <IconButton
            position="absolute"
            top={5}
            right={5}
            visibility="hidden"
            opacity={0}
            className="code-snippet-copy-button"
            aria-label="Copy code to clipboard"
            icon={buttonIcon === 'copy' ? <CopyIcon /> : <CheckIcon />}
            transition="opacity 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000), visibility 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
            onClick={copyToClipboard}
          />
        </Box>
      </Box>
    </Box>
  );
};
CodeSnippet.defaultProps = {
  children: '',
  headerText: undefined,
  startingLineNumber: 1
};

export default CodeSnippet;
