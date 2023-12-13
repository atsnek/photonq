import {
  ListItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Stack,
  Button,
  UnorderedList,
  OrderedList,
  ButtonGroup
} from '@chakra-ui/react';
import { FC } from 'react';
import Callout from '../../../features/main-content/callout/components/Callouts';
import Link from '../Link';

// Insertable custom components (via Jaen)
import Heading from '../../../features/main-content/heading/components/Heading';
import CodePlayground from '../../../features/main-content/code-playground/components/CodePlayground';
import CodeSnippet from '../../../features/main-content/code-snippet/components/CodeSnippet';
import Filesystem from '../../../features/main-content/filesystem/components/Filesystem';
import IconCard from '../../../features/main-content/icon-card/components/IconCard';
import ImageCard from '../../../features/main-content/image-card/components/ImageCard';
import DocsIndex from '../../../features/main-content/docs-index/components/DocsIndex';

import { MdxField, MdxFieldProps } from '@atsnek/jaen-fields-mdx';
import {
  useAuthenticationContext,
  useContentManagement,
  usePageContext
} from '@atsnek/jaen';
import { EditIcon, SettingsIcon } from '@chakra-ui/icons';
import { QASMPlayground } from '../../../features/main-content/qasm-playground/components/qasm-playground';

interface IMdxEditorProps {
  hideHeadingHash?: boolean;
}

export const mdxEditorComponents: MdxFieldProps['components'] = {
  // TEXT
  p: props => <Text {...props} />,
  // LIST
  ul: (props: any) => <UnorderedList {...props}></UnorderedList>,
  ol: (props: any) => <OrderedList {...props}></OrderedList>,
  li: (props: any) => <ListItem {...props}></ListItem>,
  a: (props: any) => <Link href={props.href} {...props} />,
  // TABLE
  table: (props: any) => <Table variant="striped" w="fit-content" {...props} />,
  thead: (props: any) => <Thead {...props} />,
  tbody: (props: any) => <Tbody {...props} />,
  tr: (props: any) => <Tr {...props} />,
  th: (props: any) => <Th {...props} />,
  td: (props: any) => <Td {...props} />,
  // MISC
  code: ({
    className,
    playground,
    ...props
  }: {
    playground?: boolean;
    className?: string;
  }) => {
    const lang = className?.replace('language-', '') || 'text';

    if (playground) {
      return <QASMPlayground {...props} wrapWithPre={false} />;
    }

    return <CodeSnippet language={lang} {...props} />;
  },
  // CUSTOM COMPONENTS
  QASMPlayground,
  Filesystem,
  ImageCard,
  Callout,
  IconCard,
  DocsIndex
};

const MdxEditor: FC<IMdxEditorProps> = ({ hideHeadingHash }) => {
  const { isAuthenticated, user, isLoading } = useAuthenticationContext();
  const { isEditing, toggleIsEditing } = useContentManagement();
  const { jaenPage } = usePageContext();

  const canEdit = isAuthenticated && user?.isAdmin ? true : false;

  return (
    <Stack spacing={4}>
      {canEdit && isLoading === false && (
        <ButtonGroup>
          <Button
            leftIcon={<EditIcon />}
            variant="outline"
            colorScheme={isEditing ? 'red' : undefined}
            onClick={() => toggleIsEditing()}
          >
            {isEditing ? 'Stop Editing' : 'Edit'}
          </Button>

          <Link
            leftIcon={<SettingsIcon />}
            variant="outline"
            as={Button}
            to={`/cms/pages/#${btoa(jaenPage.id)}`}
          >
            Page Settings
          </Link>
        </ButtonGroup>
      )}

      <MdxField
        name="documentation"
        components={{
          // TEXT
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
          ...mdxEditorComponents
        }}
      />
    </Stack>
  );
};

export default MdxEditor;
