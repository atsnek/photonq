import {
  Alert,
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Card,
  Heading,
  Image,
  Stack
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

/**
 * quantum-circuit is loaded when someone changes the circuit, and not before.
 *
 * It is 1.9 MB of source, the largest single package in the site's bundle, and
 * a `require` at module scope put it into the chunk graph of every page that
 * imports this file. One of those is `sections/ServiceDetails`, which the home
 * page renders, so every visitor downloaded and parsed a full quantum circuit
 * simulator.
 *
 * What that simulator did on the home page was redraw a constant. The QASM
 * there is a literal in the source and nobody can change it without a deploy,
 * so the picture is drawn once at authoring time and passed in through
 * `initialDiagram`. The engine is only needed once the code in the editor
 * stops matching the code the picture was drawn from.
 *
 * A caller that passes no `initialDiagram` keeps the old behaviour: the engine
 * loads and draws, just on approach rather than on page load.
 */
let circuitPromise: Promise<any> | null = null;

const loadCircuit = async () => {
  if (!circuitPromise) {
    circuitPromise = import(
      /* webpackChunkName: "quantum-circuit" */
      'quantum-circuit/dist/quantum-circuit.min.js'
    ).then(m => {
      const Ctor = (m as any).default || m;
      return new Ctor();
    });
  }
  return circuitPromise;
};

import CodeResultPreview from '../../code-result-preview/components/CodeResultPreview';
import CodeSnippet from '../../code-snippet/components/CodeSnippet';
import { useQasmExecutor } from '../use-qasm-executor';
import DiagramPreview from './diagram-preview';

import { Link } from 'gatsby-plugin-jaen';
import React, { isValidElement } from 'react';

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
  /**
   * A drawing of `source`, made at authoring time.
   *
   * Supplying it keeps the 1.9 MB engine out of the page for as long as the
   * code on screen still matches `source`. Leaving it out is the old
   * behaviour: the engine loads and draws.
   */
  initialDiagram?: {source: string; svg: string};
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
  children = defaultQASMCode,
  initialDiagram
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
      boxShadow: {
        base: 'none',
        sm: '6px 4px 20px -12px rgba(0,0,0,0.25)'
      }
    }
  };

  const [qasmCode, setQasmCode] = useState<string>(ReactChildrenText(children));

  useEffect(() => {
    setQasmCode(ReactChildrenText(children));
  }, [children]);

  const diagram = useRef<HTMLDivElement>(null);

  const [diagramError, setDiagramError] = useState<string>();

  // The engine, once it has been fetched. Null while the pregenerated picture
  // still matches the code on screen.
  const [circuit, setCircuit] = useState<any>(null);

  /**
   * True while the drawing that came with the page is still the right one.
   *
   * Whitespace is normalised on both sides because the literal is indented
   * inside JSX and the editor gives it back as the user typed it.
   */
  const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
  const drawnAhead =
    !!initialDiagram && norm(initialDiagram.source) === norm(qasmCode);

  useEffect(() => {
    if (circuit || drawnAhead) return;

    loadCircuit().then(setCircuit).catch(console.error);
  }, [circuit, drawnAhead]);

  useEffect(() => {
    if (!circuit) return;

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

      console.error(e);
    }
  }, [qasmCode, circuit]);

  const simulator = useQasmExecutor({ code: qasmCode, type: 'simulation' });
  const translator = useQasmExecutor({ code: qasmCode, type: 'translation' });

  const parentRef = useRef<HTMLDivElement>(null);

  const element = (
    <Card.Root
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
          <Box
            ref={diagram}
            // Server rendered, so the circuit is in the HTML instead of being
            // painted in after hydration. React leaves it alone; the effect
            // only overwrites it once the engine has drawn something newer.
            dangerouslySetInnerHTML={
              initialDiagram ? {__html: initialDiagram.svg} : undefined
            }
          />
          {diagramError && (
            <Alert.Root status="warning">
              <Alert.Indicator />
              {diagramError}
            </Alert.Root>
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
                  {!withoutTranslate && (
                    <Button
                      size="sm"
                      my="auto"
                      variant="outline"
                      _hover={{
                        transform: 'scale(1.05)'
                      }}
                      transition="transform 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
                      loading={translator.isLoading}
                      onClick={translator.run}
                    >
                      Translate
                    </Button>
                  )}

                  {!withoutSimulate && (
                    <Button
                      size="sm"
                      my="auto"
                      _hover={{
                        transform: 'scale(1.05)'
                      }}
                      transition="transform 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)"
                      loading={simulator.isLoading}
                      onClick={simulator.run}
                    >
                      Simulate
                    </Button>
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
            warnings={translator.result?.warnings}
            errors={translator.result?.errors}
            infos={translator.result?.infos}
            result={
              translator.result ? (
                <Stack gap="4">
                  {translator.result.data.map((translation, index) => (
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
            warnings={simulator.result?.warnings}
            errors={simulator.result?.errors}
            infos={simulator.result?.infos}
            result={
              simulator.result ? (
                <Stack gap="4">
                  {simulator.result.data.map((simulation, index) => (
                    <Stack key={index}>
                      {simulation ? (
                        <>
                          <Stack
                            justify="space-between"
                            align="center"
                            justifyContent="center"
                            wrap="wrap"
                          >
                            <Heading size="md">{simulation.name}</Heading>
                            <Link
                              align="left"
                              as={Button}
                              variant="link"
                              onClick={() =>
                                openImageInNewTab(simulation.dataUri)
                              }
                            >
                              View in New Tab
                            </Link>
                          </Stack>
                          <Image
                            src={simulation.dataUri}
                            alt={simulation.name + ' diagram'}
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              openImageInNewTab(simulation.dataUri)
                            }
                          />
                        </>
                      ) : (
                        <p>Simulation failed</p>
                      )}
                    </Stack>
                  ))}
                </Stack>
              ) : null
            }
          />
        )}
      </Stack>
    </Card.Root>
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
