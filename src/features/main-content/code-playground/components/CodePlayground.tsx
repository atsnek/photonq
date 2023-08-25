import { Box } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useState } from 'react';
import CodeSnippet, {
  ICodeSnippetProps
} from '../../code-snippet/components/CodeSnippet';
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
const CodePlayground: FC<ICodePlaygroundProps> = ({
  children,
  codeEditorProps,
  executeCode
}) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] =
    useState<Awaited<ReturnType<typeof executeCode>>>();

  const handleExecuteCode = async (code: string) => {
    try {
      setIsExecuting(true);

      //TODO: Replace the placeholder with this actual function call:
      setResult(await executeCode(code));
    } finally {
      setTimeout(() => {
        setIsExecuting(false);
      }, 3000);
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
          children={children}
          {...codeEditorProps}
          containerProps={{
            border: 'none',
            borderBottomRadius: 'none'
          }}
          isStandalone={false}
          isExecutable
          isExecuting={isExecuting}
          executeCode={code => handleExecuteCode(code)}
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
    startingLineNumber: 1,
    language: 'javascript'
  }
};

export default CodePlayground;
