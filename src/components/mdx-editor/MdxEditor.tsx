import {
  Button,
  ButtonGroup,
  Flex,
  Stack,
  Table,
  Text,
  List
} from '@chakra-ui/react';
import { FC } from 'react';

// Insertable custom components (via Jaen)

import {
  checkUserRoles,
  useAuth,
  useAuthUser,
  useContentManagement,
  usePageContext
} from 'jaen';
import { MdxField, MdxFieldProps } from 'jaen-fields-mdx';
import { EditIcon, SettingsIcon } from '../../components/icons/chakra';
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
import DocsLink from '../main-content/link/components/Link';

interface IMdxEditorProps {
  hideHeadingHash?: boolean;
  onMdast: (mdast: any) => void;
}

/**
 * A figure from the docs content, on a white surface in dark mode.
 *
 * The figures are black line art on a transparent ground: the fusion gates,
 * the Bloch sphere, the multi-qubit gates, the circuit labels. They were drawn
 * for a white page, and on the dark one most of each drawing disappeared. The
 * QASM diagram got its white surface in 023514c. These get the same, with a
 * little room so the lines do not touch the edge.
 *
 * The padding goes on the AspectRatio's child, not on the AspectRatio. Its
 * child is absolutely positioned over the whole padding box, so padding on
 * the box itself would not move the drawing in. Light mode is unchanged.
 */
const MdxImage = (props: any) => (
  <JaenImage
    {...props}
    _dark={{
      bg: 'white',
      borderRadius: 'md',
      '& > *:not(style)': { p: '2' }
    }}
  />
);

export const mdxEditorComponents: MdxFieldProps['components'] = {
  // TEXT
  p: props => <Text id={props.id} children={props.children} />,
  // LINKS. Replace jaen-fields-mdx's own two, whose colour is fixed at
  // brand.600 and unreadable in dark mode. See DocsLink. `a` is a Markdown
  // link, `Link` the JSX form some pages write (`<Link to="../openqasm">`).
  a: (props: any) => <DocsLink href={props.href} children={props.children} />,
  Link: (props: any) => (
    <DocsLink
      href={props.to}
      isExternal={props.isExternal}
      children={props.children}
    />
  ),
  // LIST
  ul: (props: any) => (
    <List.Root as="ul" id={props.id} children={props.children}></List.Root>
  ),
  ol: (props: any) => (
    <List.Root as="ol" id={props.id} children={props.children}></List.Root>
  ),
  li: (props: any) => (
    <List.Item id={props.id} children={props.children}></List.Item>
  ),
  // TABLE
  table: (props: any) => (
    <Table.Root
      id={props.id}
      // v3 turns striped from a variant VALUE into a boolean of its own, so it
      // now stacks on the default line variant instead of replacing it. The
      // site has no table recipe, so the stripe is v3's bg.muted where v2's
      // was tinted by the colour scheme; restoring that tint is theme work.
      striped
      w="fit-content"
      children={props.children}
    />
  ),
  thead: (props: any) => (
    <Table.Header id={props.id} children={props.children} />
  ),
  tbody: (props: any) => <Table.Body id={props.id} children={props.children} />,
  tr: (props: any) => <Table.Row id={props.id} children={props.children} />,
  th: (props: any) => (
    <Table.ColumnHeader id={props.id} children={props.children} />
  ),
  td: (props: any) => <Table.Cell id={props.id} children={props.children} />,
  // MISC
  code: ({
    className,
    playground,
    ...props
  }: {
    playground?: boolean;
    className?: string;
    children?: string;
    headerText?: string;
    withoutSimulate?: boolean;
    withoutTranslate?: boolean;
  }) => {
    const lang = className?.replace('language-', '') || 'text';

    if (playground) {
      return (
        <QASMPlayground
          children={props.children}
          wrapWithPre={false}
          withoutSimulate={props.withoutSimulate}
          withoutTranslate={props.withoutTranslate}
        />
      );
    }

    return (
      <CodeSnippet
        language={lang}
        children={props.children}
        headerText={props.headerText}
      />
    );
  },
  img: MdxImage,
  Image: MdxImage,
  /**
   * `<center>`, which the docs content wraps around its figures.
   *
   * jaen-fields-mdx sanitises the rendered tree against GitHub's schema, which
   * does not allow `center`, so the element was unwrapped and every figure
   * sat flush left. The sanitiser does allow every name in this map, so
   * naming `center` here both keeps the element and decides what it renders:
   * a column that centres each child at its own width (300px or 70% in the
   * content), which is what the tag did in a browser.
   */
  center: (props: any) => (
    <Flex direction="column" align="center" children={props.children} />
  ),
  // CUSTOM COMPONENTS
  QASMPlayground,
  Filesystem,
  ImageCard,
  Callout,
  IconCard,
  DocsIndex
};

const MdxEditor: FC<IMdxEditorProps> = ({ hideHeadingHash, onMdast }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const { isEditing, toggleIsEditing } = useContentManagement();
  const { jaenPage } = usePageContext();

  const canEdit = isAuthenticated && checkUserRoles(user, ['jaen:admin']);

  return (
    <Stack
      gap={4}
      css={{
        '& .cm-editor': {
          height: '60dvh'
        }
      }}
    >
      {canEdit && isLoading === false && (
        <ButtonGroup>
          <Button
            variant="outline"
            colorPalette={isEditing ? 'red' : undefined}
            onClick={() => toggleIsEditing()}
          >
            <EditIcon />
            {isEditing ? 'Stop Editing' : 'Edit'}
          </Button>

          {/* jaen's Link widens its props to anything, so leftIcon type-checks
              here and then reaches a v3 Button that has no such prop and drops
              the icon on the floor. As a child it renders again. */}
          <Link
            variant="outline"
            as={Button}
            to={`/cms/pages/#${btoa(jaenPage.id)}`}
          >
            <SettingsIcon />
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
          onMdast={onMdast}
        />
      </div>
    </Stack>
  );
};

export default MdxEditor;
