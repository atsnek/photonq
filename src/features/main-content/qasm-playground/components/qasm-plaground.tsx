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

export interface QASMPlaygroundProps {}

export const QASMPlayground: React.FC<QASMPlaygroundProps> = () => {
  const [qasmCode, setQasmCode] = useState<string>(
    'OPENQASM 2.0;\nimport "qelib1.inc";\nqreg q[2];\nh q[0];\ncx q[0],q[1];\n'
  );

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
    <Card my="4" p="4" borderRadius="md" variant="outline">
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
QASMPlayground.defaultProps = {};
