import { Box, BoxProps, Button, Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import 'highlight.js/styles/atom-one-dark.css';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import { IMainContentComponentBaseProps } from '../../types/mainContent';
import { mainComponentBaseStyle } from '../../../../shared/containers/main/mainContent.vars';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import '../styles/prism-one-dark.css';

export interface ICodeSnippetProps extends IMainContentComponentBaseProps {
  children?: string;
  language?: string;
  headerText?: string;
  isStandalone?: boolean;
  isExecutable?: boolean;
  isExecuting?: boolean;
  executeCode?: (code: string) => void;
  containerProps?: BoxProps;
  isEditable?: boolean;
  onChange?: (code: string) => void;
}

let timeout: NodeJS.Timeout;

/**
 * Code snippet component for displaying code examples.
 */
const CodeSnippet: FC<ICodeSnippetProps> = ({
  children = '',
  language = 'js',
  headerText,
  containerProps,
  isStandalone = true,
  isExecutable,
  isExecuting,
  executeCode,
  isEditable,
  onChange
}) => {
  const [buttonIcon, setButtonIcon] = React.useState<'copy' | 'check'>('copy');

  /**
   * Copy code to clipboard.
   */
  const copyToClipboard = () => {
    setButtonIcon('check');
    clearTimeout(timeout);
    navigator.clipboard.writeText(children);
    timeout = setTimeout(() => setButtonIcon('copy'), 2000);
  };

  let baseProps = {};
  if (isStandalone) baseProps = mainComponentBaseStyle.baseProps;

  console.log('syntax children', children, isEditable);

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
          '& .cm-gutters': {
            backgroundColor: 'components.codeSnippet.body.bgColor !important',
            border: 'none'
          },
          // '& pre': {
          //   backgroundColor: 'components.codeSnippet.body.bgColor !important',
          //   fontFamily:
          //     'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
          //   fontWeight: 500,
          //   fontSize: '12.96px',
          //   padding: 3,
          //   pt: 0,
          //   pb: 5,
          //   my: '0 !important',
          //   minH: '100px'
          // },
          '& code, & pre': {
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
                  onClick={executeCode && children ? () => executeCode(children) : undefined}
                >
                  Execute
                </Button>
              </>
            )}
          </Flex>
        )}
        <Box position="relative">
          <Editor
            value={children}
            highlight={code => highlight(code, languages[language], language)}
            onValueChange={code => {
              if (onChange) onChange(code);
            }}
            padding={5}
            style={{
              fontFamily:
                '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
              minHeight: '100px',
              margin: '10px'
            }}
          />
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
  headerText: undefined
};

export default CodeSnippet;
