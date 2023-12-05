import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Flex,
  Stack,
  Tooltip
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const QuantumCircuit = require('quantum-circuit/dist/quantum-circuit.min.js');
const circuit = new QuantumCircuit();

import CodeResultPreview from '../../code-result-preview/components/CodeResultPreview';
import CodeSnippet from '../../code-snippet/components/CodeSnippet';
import { useQasmSimulate } from '../use-qasm-simulate';
import { useQasmTranslate } from '../use-qasm-translate';
import DiagramPreview from './diagram-preview';

import React, { isValidElement } from 'react';

const hasChildren = (element: React.ReactNode) =>
  isValidElement(element) && Boolean(element.props.children);

const ReactChildrenText = (children: any): string => {
  if (hasChildren(children)) return ReactChildrenText(children.props.children);
  return children;
};

export interface QASMPlaygroundProps {
  children?: string;
}

const defaultQASMCode = `
OPENQASM 2.0;
include "qelib1.inc";
qreg q[2];
h q[0];
cx q[0],q[1];
`;

export const QASMPlayground: React.FC<QASMPlaygroundProps> = ({
  children = defaultQASMCode
}) => {
  const [qasmCode, setQasmCode] = useState<string>(ReactChildrenText(children));

  useEffect(() => {
    setQasmCode(ReactChildrenText(children));
  }, [children]);

  const diagram = useRef<HTMLDivElement>(null);

  useEffect(() => {
    circuit.importQASM(qasmCode);

    const svg = circuit.exportSVG();

    if (diagram.current) {
      diagram.current.innerHTML = svg;
    }
  }, [qasmCode]);

  const simulator = useQasmSimulate({ code: qasmCode });
  const translator = useQasmTranslate({ code: qasmCode });

  return (
    <Card my="4" p="4" borderRadius="md" variant="outline" w="full">
      <Stack w="full">
        <DiagramPreview isStandalone headerText="Diagram">
          <Box ref={diagram} overflowY="scroll"></Box>
        </DiagramPreview>

        <CodeSnippet
          language="qasm"
          headerText="QASM 2.0"
          onChange={setQasmCode}
          toolbar={
            <Flex flex="1" justifyContent="end">
              <ButtonGroup>
                <Button
                  size="sm"
                  my="auto"
                  variant="outline"
                  _hover={{
                    transform: 'scale(1.05)'
                  }}
                  transition="transform 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
                  isLoading={translator.isLoading}
                  onClick={translator.run}
                >
                  Translate
                </Button>

                <Tooltip label="We are working hard to implement this feature!">
                  <Button
                    size="sm"
                    my="auto"
                    _hover={{
                      transform: 'scale(1.05)'
                    }}
                    transition="transform 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
                    isLoading={simulator.isLoading}
                    onClick={simulator.run}
                    isDisabled
                  >
                    Simulate
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </Flex>
          }
          children={qasmCode}
        />

        <CodeResultPreview
          isStandalone
          headerText="Translation"
          isExecuting={translator.isLoading}
          result={
            translator.result ? (
              <>
                {translator.result?.map(translation => (
                  <>
                    {translation ? (
                      <img src={translation.svg} alt={translation.name || ''} />
                    ) : (
                      <p>Translation failed</p>
                    )}
                  </>
                ))}
              </>
            ) : null
          }
        />

        <CodeResultPreview
          isStandalone
          headerText="Simulation"
          isExecuting={simulator.isLoading}
        />
      </Stack>
    </Card>
  );
};

QASMPlayground.displayName = 'QASMPlayground';
QASMPlayground.defaultProps = {
  children: defaultQASMCode
};
