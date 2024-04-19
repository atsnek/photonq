import { FC } from 'react';
import { MdxFieldProps, UncontrolledMdxField } from '@atsnek/jaen-fields-mdx';
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
          h1: props => <Heading variant="h1" {...props} noAnchor />,
          h2: props => <Heading variant="h2" {...props} noAnchor />,
          h3: props => <Heading variant="h3" {...props} noAnchor />,
          h4: props => <Heading variant="h4" {...props} noAnchor />,
          h5: props => <Heading variant="h5" {...props} noAnchor />,
          h6: props => <Heading variant="h6" {...props} noAnchor />,
          wrapper: ({ children }) => <Stack>{children}</Stack>,
          ...experimentEditorComponents
        }}
      />
    </Stack>
  );
};

export default UncontrolledMdxEditor;
