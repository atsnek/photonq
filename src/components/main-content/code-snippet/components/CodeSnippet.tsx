import {
  Box,
  BoxProps,
  Flex,
  Stack,
  Text,
  VisuallyHidden
} from '@chakra-ui/react';
import 'highlight.js/styles/atom-one-dark.css';
import { highlight, languages } from 'prismjs';
import React, { FC, useEffect, useId, useMemo, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { IMainContentComponentBaseProps } from '../../types/mainContent';
import '../styles/prism-one-dark.css';

/**
 * One Dark base colours, kept in sync with ../styles/prism-one-dark.css.
 *
 * Ported from netsnek.com (bbcbceb6), which renders the same component. The
 * imported theme paints its dark ground only through
 * `code[class*="language-"], pre[class*="language-"]`, and
 * react-simple-code-editor renders its pre without a language class and with
 * an inline `background: none`. The rule never matched, so the One Dark token
 * colours sat on whatever was behind the editor: the white card in light
 * mode, where punctuation, numbers and strings read 2.0 to 2.5:1, and the
 * gray.800 card in dark mode, where the comments read 2.7:1. The editor
 * container repeats the two base values instead.
 */
const ONE_DARK_BG = 'hsl(220, 13%, 18%)';
const ONE_DARK_FG = 'hsl(220, 14%, 71%)';

/** One Dark accent, the only caret colour that stays visible on ONE_DARK_BG. */
const ONE_DARK_CARET = 'hsl(220, 100%, 66%)';

/**
 * Selection band for the editor textarea. It has to stay translucent because
 * the textarea lies on top of the highlighted pre, so an opaque band would
 * cover the code it marks.
 */
const ONE_DARK_SELECTION = 'hsla(220, 13%, 45%, 0.5)';

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

  // react-simple-code-editor forwards the rest of its props to the wrapping
  // div, never to the textarea, so aria-label cannot reach the form control.
  // Only textareaId addresses it, which leaves an explicit label as the way to
  // give the textarea an accessible name. React ids carry colons, which are
  // legal in HTML but need escaping in CSS selectors, so they are dropped.
  const reactId = useId();
  const editorId = `code-snippet-editor-${reactId.replace(/:/g, '')}`;

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

        if (parentTag === 'pre') {
          setIsCodeBlock(true);
        }
      }
    }
  }, []);

  let baseProps = {};
  if (isStandalone)
    baseProps = {
      mt: 8
    };

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
        <Stack
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
        </Stack>
      )}
      <Flex
        fontSize="sm"
        // The One Dark ground the prism theme expects but never applies here,
        // see the note on ONE_DARK_BG. The foreground covers everything prism
        // leaves untokenised.
        bgColor={ONE_DARK_BG}
        color={ONE_DARK_FG}
        // Squared off on purpose. The surrounding Box already clips with its
        // own radius, and a second radius on the now visible ground would cut
        // light notches into the corners where it meets the header.
        borderRadius="0"
        w="full"
        transition="box-shadow 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
        css={{
          // One ampersand: emotion expands each `&` to this element's own
          // class, so `& & textarea:focus` was `.css-x .css-x textarea:focus`
          // and never matched, leaving the editor's focus outline showing.
          '& textarea:focus': {
            outline: 'none'
          },
          // The textarea paints its own glyphs transparent and sits above the
          // highlighted pre, so caret and selection are all that stays visible
          // of it. Both inherited dark values from the old light ground.
          '& textarea': {
            caretColor: ONE_DARK_CARET
          },
          '& textarea::selection': {
            background: ONE_DARK_SELECTION
          },
          // Two One Dark token groups fall under 4.5:1 on their own ground.
          // They are lifted here rather than in the vendored theme file, which
          // stays a verbatim copy. Lightness is the only channel that moves.
          '& .token.comment, & .token.prolog, & .token.cdata': {
            // hsl(220, 10%, 40%) reads 2.31:1 on ONE_DARK_BG
            color: 'hsl(220, 10%, 60%)'
          },
          '& .token.property, & .token.tag, & .token.symbol, & .token.deleted, & .token.important':
            {
              // hsl(355, 65%, 65%) reads 4.37:1 on ONE_DARK_BG
              color: 'hsl(355, 65%, 67%)'
            }
        }}
        p="1"
        maxH={{
          base: 'xs',
          sm: 'sm',
          md: 'md',
          lg: 'lg'
        }}
        overflowY="scroll"
      >
        <VisuallyHidden asChild>
          <label htmlFor={editorId}>Code editor</label>
        </VisuallyHidden>
        <Editor
          textareaId={editorId}
          value={code}
          highlight={code => highlight(code, grammar, language)}
          onValueChange={code => {
            setCode(code);
            if (onChange) onChange(code);
          }}
          // padding={5}
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
            overflowWrap: 'normal'
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
