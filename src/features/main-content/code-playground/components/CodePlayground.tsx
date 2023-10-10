import { Box } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useState } from 'react';
import CodeSnippet, { ICodeSnippetProps } from '../../code-snippet/components/CodeSnippet';
import CodeResultPreview from '../../code-result-preview/components/CodeResultPreview';
import ReactDOM from 'react-dom/server';
import { mainComponentBaseStyle } from '../../../../shared/containers/main/mainContent.vars';

interface ICodePlaygroundProps {
  children: string;
  codeEditorProps: Exclude<ICodeSnippetProps, 'children'>;
  executeCode: (code: string) => Promise<ReactNode>;
}
/**
 * Component for showing a code editor and (live) preview.
 * This component uses the CodeSnippet component to display and edit the code.
 */
const CodePlayground: FC<ICodePlaygroundProps> = ({ children, codeEditorProps, executeCode }) => {
  const [code, setCode] = useState<string>(children);
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<Awaited<ReturnType<typeof executeCode>>>();

  const handleExecuteCode = async (code: string) => {
    try {
      setIsExecuting(true);

      setResult(await executeCode(code));
    } finally {
      setIsExecuting(false);
    }
  };

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
          isExecutable
          isExecuting={isExecuting}
          executeCode={code => handleExecuteCode(code)}
          onChange={setCode}
          isEditable={true}
        />
      </Box>
      <CodeResultPreview
        isStandalone
        headerText="Code Preview"
        isExecuting={isExecuting}
        result={result}
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
