import {
  Button,
  ButtonGroup,
  ListItem,
  OrderedList,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList
} from '@chakra-ui/react';
import { FC } from 'react';

// Insertable custom components (via Jaen)

import { useAuth, useContentManagement, usePageContext } from '@atsnek/jaen';
import { MdxField, MdxFieldProps } from '@atsnek/jaen-fields-mdx';
import { EditIcon, SettingsIcon } from '@chakra-ui/icons';
import { Link } from 'gatsby-plugin-jaen';

import Heading from '../main-content/heading/components/Heading';
import Callout from '../main-content/callout/components/Callouts';
import CodeSnippet from '../main-content/code-snippet/components/CodeSnippet';
import DocsIndex from '../main-content/docs-index/components/DocsIndex';
import Filesystem from '../main-content/filesystem/components/Filesystem';
import IconCard from '../main-content/icon-card/components/IconCard';
import ImageCard from '../main-content/image-card/components/ImageCard';
import { QASMPlayground } from '../main-content/qasm-playground/components/qasm-playground';
import JaenImage from '../JaenImage';

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
  const { isAuthenticated, user, isLoading } = useAuth();
  const { isEditing, toggleIsEditing } = useContentManagement();
  const { jaenPage } = usePageContext();

  const canEdit = true;

  return (
    <Stack
      spacing={4}
      sx={{
        '.cm-editor': {
          height: '60dvh'
        }
      }}
    >
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

      <div>
        <MdxField
          key={jaenPage.id}
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
            wrapper: ({ children }) => <Stack>{children}</Stack>,
            ...mdxEditorComponents
          }}
        />
      </div>
    </Stack>
  );
};

export default MdxEditor;
