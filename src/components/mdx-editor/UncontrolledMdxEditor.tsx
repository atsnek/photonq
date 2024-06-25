import { FC } from 'react';
import { MdxFieldProps, UncontrolledMdxField } from 'jaen-fields-mdx';
import { mdxEditorComponents } from './MdxEditor';
import Heading from '../main-content/heading/components/Heading';
import { Stack } from '@chakra-ui/react';

const experimentEditorComponents: MdxFieldProps['components'] = {
  ...mdxEditorComponents
};

delete experimentEditorComponents.Filesystem;
delete experimentEditorComponents.DocsIndex;

interface IUncontrolledMdxEditorProps
  extends Omit<Parameters<typeof UncontrolledMdxField>[0], 'components'> {}

/**
 * Standalone MDX editor without automatic loading/saving by Jaen.
 */
const UncontrolledMdxEditor: FC<IUncontrolledMdxEditorProps> = ({
  ...props
}) => {
  return (
    <Stack
      sx={{
        '.cm-editor': {
          height: '60dvh'
        }
      }}
    >
      <UncontrolledMdxField
        {...props}
        components={{
          h1: props => (
            <Heading
              id={props.id}
              variant="h1"
              noAnchor
              children={props.children}
            />
          ),
          h2: props => (
            <Heading
              id={props.id}
              variant="h2"
              noAnchor
              children={props.children}
            />
          ),
          h3: props => (
            <Heading
              id={props.id}
              variant="h3"
              noAnchor
              children={props.children}
            />
          ),
          h4: props => (
            <Heading
              id={props.id}
              variant="h4"
              noAnchor
              children={props.children}
            />
          ),
          h5: props => (
            <Heading
              id={props.id}
              variant="h5"
              noAnchor
              children={props.children}
            />
          ),
          h6: props => (
            <Heading
              id={props.id}
              variant="h6"
              noAnchor
              children={props.children}
            />
          ),
          wrapper: ({ children }) => <Stack>{children}</Stack>,
          ...experimentEditorComponents
        }}
      />
    </Stack>
  );
};

export default UncontrolledMdxEditor;
