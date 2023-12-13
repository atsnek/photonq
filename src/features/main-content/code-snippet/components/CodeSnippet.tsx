import { Box, BoxProps, Flex, Text } from '@chakra-ui/react';
import 'highlight.js/styles/atom-one-dark.css';
import { highlight, languages } from 'prismjs';
import React, { FC, useEffect, useMemo, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { mainComponentBaseStyle } from '../../../../shared/containers/main/mainContent.vars';
import { IMainContentComponentBaseProps } from '../../types/mainContent';
import '../styles/prism-one-dark.css';

export interface ICodeSnippetProps extends IMainContentComponentBaseProps {
  parentRef?: React.RefObject<HTMLDivElement>;
  children?: string;
  language?: string;
  headerText?: string;
  isStandalone?: boolean;
  isExecutable?: boolean;
  toolbar?: React.ReactNode;

  containerProps?: BoxProps;
  onChange?: (code: string) => void;
}

/**
 * Code snippet component for displaying code examples.
 */
const CodeSnippet: FC<ICodeSnippetProps> = ({
  parentRef,
  children = '',
  language = 'js',
  headerText,
  containerProps,
  isStandalone = true,
  toolbar = <></>,
  onChange
}) => {
  const [code, setCode] = useState(children);
  const [buttonIcon, setButtonIcon] = React.useState<'copy' | 'check'>('copy');

  const grammar = useMemo(() => {
    try {
      highlight('', languages[language], language);
      return languages[language];
    } catch {
      return languages.js;
    }
  }, [language]);

  useEffect(() => {
    if (children !== code) setCode(children);
  }, [children]);

  /**
   * Copy code to clipboard.
   */
  // const copyToClipboard = () => {
  //   setButtonIcon('check');
  //   clearTimeout(timeout);
  //   navigator.clipboard.writeText(children);
  //   timeout = setTimeout(() => setButtonIcon('copy'), 2000);
  // };

  const ref = React.useRef<HTMLDivElement>(null);

  const [isCodeBlock, setIsCodeBlock] = useState(false);

  useEffect(() => {
    const r = parentRef || ref;

    if (r?.current) {
      const parent = r.current.parentElement;
      if (parent) {
        const parentTag = parent.tagName.toLowerCase();

        console.log(r.current, parent);

        if (parentTag === 'pre') {
          setIsCodeBlock(true);
        }
      }
    }
  }, []);

  let baseProps = {};
  if (isStandalone) baseProps = mainComponentBaseStyle.baseProps;

  if (!isCodeBlock) {
    return (
      <Box
        as="code"
        ref={ref}
        bgColor="components.codeSnippet.header.bgColor"
        paddingInline=".4125ex"
        paddingBlock=".825ex"
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      {...baseProps}
      overflow="hidden"
      boxSizing="border-box"
      flex="1"
      border="1px solid"
      borderColor="components.codeSnippet.borderColor"
      borderRadius="xl"
      _hover={{
        boxShadow: 'md'
      }}
      transition="box-shadow 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
      {...containerProps}
    >
      {(headerText || toolbar) && (
        <Flex
          bgColor="components.codeSnippet.header.bgColor"
          color="components.codeSnippet.header.text.color"
          _hover={{
            color: 'components.codeSnippet.header._hover.text.color'
          }}
          transition="color 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
          p={3}
          flexDir={{ base: 'column', md: 'row' }}
        >
          {headerText && (
            <Text fontSize="xs" my="auto">
              {headerText}
            </Text>
          )}
          {toolbar}
        </Flex>
      )}
      <Flex
        fontSize="sm"
        borderRadius="md"
        w="full"
        transition="box-shadow 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
        __css={{
          '& textarea:focus': {
            outline: 'none'
          }
        }}
      >
        <Editor
          value={code}
          highlight={code => highlight(code, grammar, language)}
          onValueChange={code => {
            setCode(code);
            if (onChange) onChange(code);
          }}
          padding={5}
          style={{
            flex: 1,
            fontFamily: 'monospace',
            margin: '10px',
            // All cildren of the editor white-space is set to pre
            // so that the code is displayed as is
            // this is needed to display the code snippet correctly
            // in the editor
            whiteSpace: 'pre',
            wordBreak: 'keep-all',
            overflowWrap: 'normal',
          }}
        />
      </Flex>
    </Box>
  );
};

CodeSnippet.defaultProps = {
  children: '',
  headerText: undefined
};

export default CodeSnippet;
