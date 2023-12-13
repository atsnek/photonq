import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Card,
  Flex,
  Heading,
  Image,
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
import { Link } from 'gatsby-plugin-jaen';

const hasChildren = (element: React.ReactNode) =>
  isValidElement(element) && Boolean(element.props.children);

const ReactChildrenText = (children: any): string => {
  if (typeof children === 'string') return children;

  if (hasChildren(children)) return ReactChildrenText(children.props.children);

  return children;
};

export interface QASMPlaygroundProps {
  wrapWithPre?: boolean;
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
  wrapWithPre = true,
  children = defaultQASMCode
}) => {
  const [qasmCode, setQasmCode] = useState<string>(ReactChildrenText(children));

  useEffect(() => {
    setQasmCode(ReactChildrenText(children));
  }, [children]);

  const diagram = useRef<HTMLDivElement>(null);

  const [diagramError, setDiagramError] = useState<string>();

  useEffect(() => {
    try {
      circuit.importQASM(qasmCode);

      const svg = circuit.exportSVG();

      if (diagram.current) {
        diagram.current.innerHTML = svg;
      }

      setDiagramError(undefined);
    } catch (e) {
      setDiagramError(
        'There was an error while rendering the diagram. Please check your QASM code.'
      );

      if (diagram.current) {
        diagram.current.innerHTML = '';
      }

      console.log(e);
    }
  }, [qasmCode]);

  const simulator = useQasmSimulate({ code: qasmCode });
  const translator = useQasmTranslate({ code: qasmCode });

  const parentRef = useRef<HTMLDivElement>(null);

  const element = (
    <Card
      ref={parentRef}
      my={4}
      p={{ base: 0, sm: 4 }}
      borderRadius="md"
      variant="outline"
      w="full"
      borderWidth={{ base: 0, sm: 1 }}
    >
      <Stack w="full">
        <DiagramPreview isStandalone headerText="Diagram">
          <Box ref={diagram} overflowY="scroll"></Box>
          {diagramError && (
            <Alert status="warning">
              <AlertIcon />
              {diagramError}
            </Alert>
          )}
        </DiagramPreview>

        <CodeSnippet
          parentRef={parentRef}
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
          headerTextRight="Powered by Perceval, Qiskit, PyZX"
          isExecuting={translator.isLoading}
          warnings={translator.data?.warnings}
          errors={translator.data?.errors}
          result={
            translator.data ? (
              <Stack spacing="4">
                {translator.data.translation?.map((translation, index) => (
                  <Stack key={index}>
                    {translation ? (
                      <>
                        <Flex justify="space-between" align="center" wrap="wrap">
                          <Heading size="md" w={{ base: 'full', md: 'fit-content' }}>
                            {translation.name}
                          </Heading>
                          <Link
                            align="left"
                            as={Button}
                            variant="link"
                            onClick={() => openImageInNewTab(translation.dataUri)}
                          >
                            View in New Tab
                          </Link>
                        </Flex>
                        <Image
                          src={translation.dataUri}
                          alt={translation.name + ' diagram'}
                          style={{ cursor: 'pointer' }}
                          onClick={() => openImageInNewTab(translation.dataUri)}
                        />
                      </>
                    ) : (
                      <p>Translation failed</p>
                    )}
                  </Stack>
                ))}
              </Stack>
            ) : null
          }
        />

        <CodeResultPreview isStandalone headerText="Simulation" isExecuting={simulator.isLoading} />
      </Stack>
    </Card>
  );

  if (wrapWithPre) {
    return <pre>{element}</pre>;
  }

  return element;
};

function openImageInNewTab(imageSrc: string) {
  const newWindow = window.open();

  if (!newWindow) return;

  newWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            overflow: hidden;
          }
          img {
            width: 100%;
            height: 100vh;
            object-fit: contain;
            #background-color: green;
          }
        </style>
      </head>
      <body>
        <img src="${imageSrc}" alt="Diagram" />
      </body>
    </html>
  `);
}

QASMPlayground.displayName = 'QASMPlayground';
QASMPlayground.defaultProps = {
  children: defaultQASMCode
};
