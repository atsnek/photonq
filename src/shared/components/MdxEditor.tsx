import {
  List,
  ListItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text
} from '@chakra-ui/react';
import { Field } from '@snek-at/jaen';
import { FC } from 'react';
import Callout from '../../features/main-content/callout/components/Callouts';
import Link from './Link';

// Insertable custom components (via Jaen)
import Heading from '../../features/main-content/heading/components/Heading';
import CodePlayground from '../../features/main-content/code-playground/components/CodePlayground';
import CodeSnippet from '../../features/main-content/code-snippet/components/CodeSnippet';
import Filesystem from '../../features/main-content/filesystem/components/Filesystem';
import IconCard from '../../features/main-content/icon-card/components/IconCard';
import ImageCard from '../../features/main-content/image-card/components/ImageCard';

interface IMdxEditorProps {
  hideHeadingHash?: boolean;
}

const MdxEditor: FC<IMdxEditorProps> = ({ hideHeadingHash }) => {
  return (
    <Field.Mdx
      name="documentation"
      components={{
        // TEXT
        p: props => <Text {...props} />,
        h1: props => (
          <Heading variant="h1" {...props} noAnchor={hideHeadingHash} />
        ),
        h2: props => (
          <Heading variant="h2" {...props} noAnchor={hideHeadingHash} />
        ),
        h3: props => (
          <Heading variant="h3" {...props} noAnchor={hideHeadingHash} />
        ),
        h4: props => (
          <Heading variant="h4" {...props} noAnchor={hideHeadingHash} />
        ),
        h5: props => (
          <Heading variant="h5" {...props} noAnchor={hideHeadingHash} />
        ),
        h6: props => (
          <Heading variant="h6" {...props} noAnchor={hideHeadingHash} />
        ),
        // LIST
        ul: (props: any) => <List {...props}></List>,
        ol: (props: any) => <List variant="ordered" {...props}></List>,
        li: (props: any) => <ListItem {...props}></ListItem>,
        a: (props: any) => <Link href={props.href} {...props} />,
        // TABLE
        table: (props: any) => (
          <Table variant="striped" w="fit-content" {...props} />
        ),
        thead: (props: any) => <Thead {...props} />,
        tbody: (props: any) => <Tbody {...props} />,
        tr: (props: any) => <Tr {...props} />,
        th: (props: any) => <Th {...props} />,
        td: (props: any) => <Td {...props} />,
        // MISC
        //@ts-expect-error
        code: ({
          className,
          playground,
          ...props
        }: {
          playground?: boolean;
          className?: string;
          children: string;
        }) => {
          const lang = className?.replace('language-', '') || 'text';

          if (playground) {
            return (
              <CodePlayground
                codeEditorProps={{
                  language: lang,
                  ...props
                }}
                executeCode={async code => {
                  await new Promise(resolve => setTimeout(resolve, 3000));

                  // Fetch some random data from the internet
                  const res = await fetch(
                    'https://jsonplaceholder.typicode.com/todos/1'
                  );
                  const data = await res.json();

                  return (
                    <Box>
                      <h1>How cool is that?</h1>
                      <pre>{JSON.stringify(data, null, 2)}</pre>
                    </Box>
                  );
                }}
                {...props}
              />
            );
          }

          return <CodeSnippet language={lang} {...props} />;
        },
        // CUSTOM COMPONENTS
        Filesystem,
        ImageCard,
        Callout,
        IconCard
      }}
    />
  );
};

export default MdxEditor;
