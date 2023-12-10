import { Box, Button } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useState } from 'react';
import CodeSnippet, { ICodeSnippetProps } from '../../code-snippet/components/CodeSnippet';
import CodeResultPreview from '../../code-result-preview/components/CodeResultPreview';
import ReactDOM from 'react-dom/server';
import { mainComponentBaseStyle } from '../../../../shared/containers/main/mainContent.vars';

interface ICodePlaygroundProps {
  children: string;
  codeEditorProps: Exclude<ICodeSnippetProps, 'children'>;
  onCodeChange?: (code: string) => void;
  toolbar?: ReactNode;
}
/**
 * Component for showing a code editor and (live) preview.
 * This component uses the CodeSnippet component to display and edit the code.
 */
const CodePlayground: FC<ICodePlaygroundProps> = ({
  children,
  codeEditorProps,
  toolbar,
  onCodeChange
}) => {
  const [code, setCode] = useState<string>(children);

  useEffect(() => {
    if (onCodeChange) onCodeChange(code);
  }, [code]);

  return (
    <>
      <Box
        {...mainComponentBaseStyle.baseProps}
        border="1px solid"
        borderRadius="xl"
        borderColor="components.codeSnippet.borderColor"
        h="fit-content"
        overflow="hidden"
      >
        <CodeSnippet
          children={code}
          {...codeEditorProps}
          containerProps={{
            border: 'none',
            borderBottomRadius: 'none'
          }}
          isStandalone={false}
          toolbar={toolbar}
          onChange={setCode}
          // isEditable={true}
        />
      </Box>
      <CodeResultPreview
        isStandalone
        headerText="Code Preview"
        // isExecuting={isExecuting}
        // result={result}
      />
    </>
  );
};

CodePlayground.defaultProps = {
  children: 'This is a code playground',
  codeEditorProps: {
    headerText: 'Editable Code',
    language: 'javascript'
  }
};

export default CodePlayground;
