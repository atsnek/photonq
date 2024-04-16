import { FC } from 'react';
import { UncontrolledMdxField } from '@atsnek/jaen-fields-mdx';
import { mdxEditorComponents } from './MdxEditor';
import Heading from '../../../features/main-content/heading/components/Heading';

interface IUncontrolledMdxEditorProps
  extends Omit<Parameters<typeof UncontrolledMdxField>[0], 'components'> {}

/**
 * Standalone MDX editor without automatic loading/saving by Jaen.
 */
const UncontrolledMdxEditor: FC<IUncontrolledMdxEditorProps> = ({
  ...props
}) => {
  return (
    <UncontrolledMdxField
      {...props}
      components={{
        h1: props => <Heading variant="h1" {...props} noAnchor />,
        h2: props => <Heading variant="h2" {...props} noAnchor />,
        h3: props => <Heading variant="h3" {...props} noAnchor />,
        h4: props => <Heading variant="h4" {...props} noAnchor />,
        h5: props => <Heading variant="h5" {...props} noAnchor />,
        h6: props => <Heading variant="h6" {...props} noAnchor />,
        ...mdxEditorComponents
      }}
    />
  );
};

export default UncontrolledMdxEditor;
