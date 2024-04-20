import {
  Alert,
  AlertIcon,
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Card,
  Center,
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
import { Field } from '@atsnek/jaen';

const hasChildren = (element: React.ReactNode) =>
  isValidElement(element) && Boolean(element.props.children);

const ReactChildrenText = (children: any): string => {
  if (typeof children === 'string') return children;

  if (hasChildren(children)) return ReactChildrenText(children.props.children);

  return children;
};

export interface QASMPlaygroundProps {
  wrapWithPre?: boolean;
  withoutSimulate?: boolean;
  withoutTranslate?: boolean;
  children?: string;
}

const defaultQASMCode = `
OPENQASM 2.0;
include "qelib1.inc";
qreg q[2];
h q[0];
cz q[0],q[1];
`;

export const QASMPlayground: React.FC<QASMPlaygroundProps> = ({
  wrapWithPre = true,
  withoutSimulate = false,
  withoutTranslate = false,
  children = defaultQASMCode
}) => {
  const cardProps: BoxProps = {
    bgColor: 'pq.sections.features.card.bgColor',
    boxShadow: '4px 2px 16px -12px rgba(0,0,0,0.25)',
    padding: {
      base: 2,
      sm: 10
    },
    borderRadius: '3xl',
    overflow: 'hidden',
    _hover: {
      transform: {
        base: 'none',
        sm: 'scale(1.01)'
      },
      boxShadow: {
        base: 'none',
        sm: '6px 4px 20px -12px rgba(0,0,0,0.25)'
      }
    },
    transition:
      'transform 0.2s cubic-bezier(.17,.67,.83,.67), box-shadow 0.2s cubic-bezier(.17,.67,.83,.67)'
  };

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
      my="4"
      py={4}
      p={{ base: 0, sm: 4 }}
      borderRadius="md"
      variant="outline"
      w="full"
      borderWidth={{ base: 0, sm: 1 }}
      {...cardProps}
    >
      <Stack w="full">
        <DiagramPreview isStandalone headerText="Diagram">
          <Box ref={diagram}></Box>
          {diagramError && (
            <Alert status="warning">
              <AlertIcon />
              {diagramError}
            </Alert>
          )}
        </DiagramPreview>

        <pre>
          <Box ref={parentRef}>
            <CodeSnippet
              parentRef={parentRef}
              language="qasm"
              headerText="QASM 2.0"
              onChange={setQasmCode}
              toolbar={
                <ButtonGroup>
                  {!withoutSimulate && (
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
                  )}

                  {!withoutTranslate && (
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
                  )}
                </ButtonGroup>
              }
              children={qasmCode}
            />
          </Box>
        </pre>

        {!withoutTranslate && (
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
                          <Stack
                            justify="space-between"
                            align="center"
                            justifyContent="center"
                            wrap="wrap"
                          >
                            <Heading size="md">{translation.name}</Heading>
                            <Link
                              align="left"
                              as={Button}
                              variant="link"
                              onClick={() =>
                                openImageInNewTab(translation.dataUri)
                              }
                            >
                              View in New Tab
                            </Link>
                          </Stack>
                          <Image
                            src={translation.dataUri}
                            alt={translation.name + ' diagram'}
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              openImageInNewTab(translation.dataUri)
                            }
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
        )}

        {!withoutSimulate && (
          <CodeResultPreview
            isStandalone
            headerText="Simulation"
            isExecuting={simulator.isLoading}
          />
        )}
      </Stack>
    </Card>
  );

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
