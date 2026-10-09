import { PageConfig, PageProps, osg, useNotificationsContext } from 'jaen';
import {
  Avatar,
  Box,
  Breadcrumb,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  LinkBox,
  LinkOverlay,
  Menu,
  Portal,
  Separator,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text
} from '@chakra-ui/react';

import { FaRegShareSquare } from '@react-icons/all-files/fa/FaRegShareSquare';
import { FaRocket } from '@react-icons/all-files/fa/FaRocket';
import { FaUsers } from '@react-icons/all-files/fa/FaUsers';

import { sq } from '@/clients/social';
import { PrivacyInput } from '@/clients/social/src/schema.generated';
import { graphql, navigate } from 'gatsby';
import { Link } from 'gatsby-plugin-jaen';
import { useEffect, useMemo, useRef, useState } from 'react';
import { asEnumKey } from 'snek-query';
import { useLazyQuery } from 'snek-query/react-hooks';
import { TextControl } from '../../components/TextControl';
import UncontrolledMdxEditor from '../../components/mdx-editor/UncontrolledMdxEditor';
import TableOfContent from '../../components/navigation/TableOfContent';
import PostCardRating from '../../components/post/PostCardRating';
import { useTOCContext } from '../../contexts/toc';
// The three glyphs this page took from @chakra-ui/icons, vendored locally. The
// codemod swapped in lucide look-alikes, which is a different icon set and a
// different drawing; these are the paths v2 actually painted.
import {
  CheckIcon,
  DeleteIcon,
  ExternalLinkIcon
} from '../../components/icons/chakra';

const useId = () => {
  const [id, setId] = useState<string>(Math.random().toString(36).substring(2));

  const refresh = () => setId(Math.random().toString(36).substring(2));

  return [id, refresh] as const;
};

const DocsPage: React.FC<PageProps> = ({ params }) => {
  const notify = useNotificationsContext();

  // Use React.useId instead (available in React 18+)
  const [mdxKey, refreshMdxKey] = useId();

  const [_, { data, isLoading, refetch, isSafe }] = useLazyQuery(sq);

  const toc = useTOCContext();

  useEffect(() => {
    refetch();
  }, [params.slug]);

  const post = data.post({ where: { slug: params.slug } });

  /**
   * The author and the dates, read on every render, the loading one included.
   *
   * snek-query requests only the fields a render reads off its placeholder
   * before the request goes out (see PostCard). The author line below renders
   * its children only once the data is safe, so the handle, the profile link
   * and both dates were never requested and the loaded page showed "@" and
   * "Invalid Date". Reading them here puts them back into the request.
   */
  const author = typeof post.user === 'function' ? post.user() : undefined;
  const authorId = author?.id;
  const authorUserName = author?.profile?.userName;
  const authorDisplayName = author?.profile?.displayName;
  const authorAvatarUrl = author?.profile?.avatarUrl;
  const createdAt = post.createdAt;
  const updatedAt = post.updatedAt;

  useEffect(() => {
    document.title = post.title;
  }, [post]);

  const [values, setValues] = useState({
    title: post.title,
    summary: post.summary,
    content: post.content,
    avatarURL: post.avatarURL
  });

  useEffect(() => {
    setValues({
      title: post.title,
      summary: post.summary,
      content: post.content,
      avatarURL: post.avatarURL
    });
  }, [post]);

  // useEffect(() => {
  //   if (values.content) {
  //     try {
  //       toc.setValue(JSON.parse(values.content));
  //     } catch {
  //       toc.setValue(undefined);
  //     }
  //   } else {
  //     toc.setValue(undefined);
  //   }
  // }, [values.content]);

  const hasChanges = useMemo(() => {
    return (
      (isSafe &&
        ((values.title !== undefined && values.title !== post.title) ||
          (values.summary !== undefined && values.summary !== post.summary) ||
          (values.content !== undefined && values.content !== post.content))) ||
      (values.avatarURL !== undefined && values.avatarURL !== post.avatarURL)
    );
  }, [values, post, isSafe]);

  const [isSaving, setIsSaving] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isImageUploading, setIsImageUploading] = useState(false);

  const parsedContext = useMemo(() => {
    if (!values.content) {
      return undefined;
    }

    try {
      // Legacy parse to get posts with old content (MDAST)
      return JSON.parse(values.content);
    } catch {
      if (typeof values.content === 'string') {
        return values.content;
      }

      return undefined;
    }
  }, [values.content]);

  return (
    <Stack key={post.id} gap={8}>
      <Breadcrumb.Root mb="4">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link asChild>
              <Link to="/experiments">
                <HStack gap="1">
                  <Icon display="inline-block" color="brand.500" mr="2" asChild>
                    <FaUsers />
                  </Icon>
                  <Text color="gray.600">Community Experiments</Text>
                </HStack>
              </Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          {/* v2's Breadcrumb defaulted `separator` to "/". v3 has no such prop
              and its Separator falls back to a chevron, so the slash is
              written out. */}
          <Breadcrumb.Separator>/</Breadcrumb.Separator>
          <Breadcrumb.Item>
            {/* v2's `isCurrentPage` on the item made BreadcrumbLink render a
                <span aria-current="page"> and drop the href; CurrentLink is
                that span. `color` restores v2's `link: {color: inherit}` base,
                which v3 replaced with the plain variant's `fg`. */}
            <Breadcrumb.CurrentLink color="inherit">
              {post.title}
            </Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <Stack gap="4">
        <Stack display={post.isOwner ? 'flex' : 'none'}>
          <Separator />
          <Flex justifyContent="space-between" alignItems="center">
            {post.privacy === 'PRIVATE' ? (
              <Button
                /**
                 * v2 selected the built-in `link` variant, which v3 dropped.
                 * `plain` is the nearest survivor, but it only carries the
                 * colour: the size variant's 40px box and 16px gutter stay, so
                 * this renders as a button-shaped block where v2 rendered bare
                 * text. The props below are v2's own variantLink entry
                 * (`padding: 0`, `height: auto`, `lineHeight: normal`,
                 * `verticalAlign: baseline`, hover underline) plus its colour,
                 * `mode(brand.500, brand.200)`, which `plain` maps to
                 * colorPalette.fg (brand.600) instead. `minW` is left alone:
                 * v2's link kept the size variant's 2.5rem and so does this.
                 */
                variant="plain"
                px="0"
                h="auto"
                lineHeight="normal"
                verticalAlign="baseline"
                color={{ base: 'brand.500', _dark: 'brand.200' }}
                _hover={{ textDecoration: 'underline' }}
                fontWeight="normal"
                onClick={async () => {
                  const confirm = await notify.confirm({
                    title: 'Publish Experiment',
                    message: 'Are you sure you want to publish this experiment?'
                  });

                  if (confirm) {
                    const [_, errors] = await sq.mutate(m =>
                      m.postUpdate({
                        id: post.id,
                        values: {
                          privacy: asEnumKey(PrivacyInput, 'PUBLIC')
                        }
                      })
                    );

                    refetch();

                    if (errors) {
                      notify.toast({
                        title: 'Error',
                        status: 'error',
                        description:
                          'An error occurred while publishing the experiment.'
                      });
                    } else {
                      notify.toast({
                        title: 'Experiment Published',
                        status: 'success',
                        description:
                          'The experiment has been successfully published.'
                      });
                    }
                  }
                }}
              >
                <FaRocket />
                Publish
              </Button>
            ) : (
              <Button
                // Same v2 `link` restoration as the Publish button above. No
                // colour of its own here: v2's link colour lost to the
                // explicit `color` prop, and still does.
                variant="plain"
                px="0"
                h="auto"
                lineHeight="normal"
                verticalAlign="baseline"
                _hover={{ textDecoration: 'underline' }}
                colorPalette="green"
                fontWeight="normal"
                color="gray.500"
                onClick={async () => {
                  const confirm = await notify.confirm({
                    title: 'Unpublish Experiment',
                    message:
                      'Are you sure you want to unpublish this experiment?'
                  });

                  if (confirm) {
                    const [_, errors] = await sq.mutate(m =>
                      m.postUpdate({
                        id: post.id,
                        values: {
                          privacy: asEnumKey(PrivacyInput, 'PRIVATE')
                        }
                      })
                    );

                    refetch();

                    if (errors) {
                      notify.toast({
                        title: 'Error',
                        status: 'error',
                        description:
                          'An error occurred while unpublishing the experiment.'
                      });
                    } else {
                      notify.toast({
                        title: 'Experiment Unpublished',
                        status: 'success',
                        description:
                          'The experiment has been successfully unpublished.'
                      });
                    }
                  }
                }}
              >
                <CheckIcon color="green.500" />
                Published
              </Button>
            )}

            {/* v2's ButtonGroup was a bare `display: inline-flex` div with no
                align-items, so in the base breakpoint's column direction the
                controls stretched to a common width. v3's ButtonGroup delegates
                to Group, which passes `align="center"` ahead of the rest props
                and leaves each control at its natural width. */}
            <ButtonGroup flexDir={['column', 'row']} align="stretch">
              <Button
                variant="outline"
                disabled={!hasChanges}
                loading={isSaving}
                onClick={async () => {
                  setIsSaving(true);

                  const [_, errors] = await sq.mutate(m =>
                    m.postUpdate({
                      id: post.id,
                      values: {
                        title: values.title,
                        summary: values.summary || undefined,
                        content: values.content || undefined
                      }
                    })
                  );

                  refetch();

                  setIsSaving(false);

                  if (errors) {
                    notify.toast({
                      title: 'Error',
                      status: 'error',
                      description:
                        'An error occurred while saving the experiment.'
                    });
                  } else {
                    notify.toast({
                      title: 'Experiment Saved',
                      status: 'success',
                      description: 'The experiment has been successfully saved.'
                    });
                  }
                }}
              >
                Save
              </Button>

              {hasChanges && (
                <Button
                  variant="ghost"
                  colorPalette="red"
                  onClick={() => {
                    setValues({
                      title: post.title,
                      summary: post.summary,
                      content: post.content,
                      avatarURL: post.avatarURL
                    });

                    refreshMdxKey();
                  }}
                >
                  Cancel
                </Button>
              )}

              <Input
                type="file"
                ref={imageInputRef}
                display="none"
                onChange={async e => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setIsImageUploading(true);

                    try {
                      const { fileUrl } = await osg.uploadFile(file);

                      setValues({
                        ...values,
                        avatarURL: fileUrl
                      });
                    } catch {
                      notify.toast({
                        title: 'Error',
                        status: 'error',
                        description:
                          'An error occurred while uploading the image.'
                      });
                    } finally {
                      setIsImageUploading(false);
                    }
                  }
                }}
              />

              <IconButton
                aria-label="Delete"
                variant="ghost"
                colorPalette="red"
                onClick={async () => {
                  const confirm = await notify.confirm({
                    title: 'Delete Experiment',
                    message: 'Are you sure you want to delete this experiment?'
                  });

                  if (confirm) {
                    const [_, errors] = await sq.mutate(m =>
                      m.postDelete({ id: post.id })
                    );

                    if (errors) {
                      notify.toast({
                        title: 'Error',
                        status: 'error',
                        description:
                          'An error occurred while deleting the experiment.'
                      });
                    } else {
                      notify.toast({
                        title: 'Experiment Deleted',
                        status: 'success',
                        description:
                          'The experiment has been successfully deleted.'
                      });

                      navigate(`/users/${authorId}`);
                    }
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ButtonGroup>
          </Flex>
          <Separator />
        </Stack>

        <HStack gap="4">
          {/* v2's SkeletonCircle was `<Skeleton borderRadius="full"
              boxSize="2rem" {...props}/>` and this call site overrode both
              defaults, so the circle was never round. v3's wraps the Skeleton
              in a Circle whose `border-radius: 9999px` is applied THROUGH
              asChild and therefore outranks the prop, which would round the
              square avatar's placeholder. Skeleton is what v2 rendered. */}
          <Skeleton
            boxSize="unset"
            loading={!(isSafe && !isImageUploading)}
            borderRadius="md"
          >
            {/* v2 handed `borderRadius` to the container AND the img. In v3
                both read `var(--avatar-radius)`, which only the shape variant
                sets, so a borderRadius prop would round the box and leave the
                image a circle. `rounded` is `radii.l3`, i.e. radii.md. */}
            <Avatar.Root
              size="md"
              shape="rounded"
              _hover={
                post.isOwner
                  ? {
                      cursor: 'pointer',
                      filter: 'brightness(0.8)',
                      outlineColor: 'var(--chakra-colors-brand-400)',
                      outlineWidth: '2px',
                      outlineStyle: 'solid',
                      outlineOffset: '2px'
                    }
                  : {}
              }
              cursor={post.isOwner ? 'pointer' : 'default'}
              onClick={() => {
                if (post.isOwner) {
                  imageInputRef.current?.click();
                }
              }}
            >
              <Avatar.Fallback name={values.title} />
              {/* v2's AvatarImage emitted `alt={name}` from the Avatar's own
                  name. v3 forwards to ark's Avatar.Image, which sets no alt, so
                  the name is repeated here from the sibling Fallback. */}
              <Avatar.Image
                src={values.avatarURL || undefined}
                alt={values.title}
              />
            </Avatar.Root>
          </Skeleton>

          {/* Same two SkeletonText deltas as the editor block below: v3 spreads
              the children into every placeholder line, and hard-codes each
              line's `height` to "4" where v2's skeletonHeight defaulted to
              0.5rem. Withholding the child and restoring the height while
              loading leaves the loaded DOM untouched. */}
          <SkeletonText
            loading={!isSafe}
            height={isSafe ? undefined : '0.5rem'}
          >
            {isSafe ? (
              <TextControl
                key={values.title}
                text={values.title}
                onSubmit={title => {
                  setValues({
                    ...values,
                    title
                  });
                }}
                type="heading"
                editable={post.isOwner}
              />
            ) : null}
          </SkeletonText>
        </HStack>

        <SkeletonText loading={!isSafe} height={isSafe ? undefined : '0.5rem'}>
          {isSafe ? (
            <TextControl
              key={values.summary}
              text={values.summary || undefined}
              onSubmit={summary => {
                setValues({
                  ...values,
                  summary
                });
              }}
              type="text"
              editable={post.isOwner}
            />
          ) : null}
        </SkeletonText>
      </Stack>
      {/* v2's `as={Flex}` let LinkBox take Flex's shorthands. Under asChild
          the Flex is a real child component again, so they belong to it. */}
      <LinkBox asChild>
        <Flex alignItems="center">
          <SkeletonCircle boxSize="unset" loading={!isSafe}>
            <Avatar.Root size="md">
              <Avatar.Fallback name={authorDisplayName} />
              {/* v2's `alt={name}`, again from the sibling Fallback. */}
              <Avatar.Image
                src={authorAvatarUrl || ''}
                alt={authorDisplayName}
              />
            </Avatar.Root>
          </SkeletonCircle>
          <Box ml={2}>
            {/* The children here are the costly case of v3 spreading them into
                every placeholder line: three copies of the LinkOverlay, so
                three stacked `_before` boxes over the LinkBox and three gatsby
                route prefetches for /users/<id>. v2 gave the children to line 0
                only. `height` restores v2's 0.5rem per line over v3's "4". */}
            <SkeletonText
              loading={!isSafe}
              height={isSafe ? undefined : '0.5rem'}
            >
              {isSafe ? (
                <>
                  <Text>{authorDisplayName}</Text>

                  <Text fontSize="sm" color="gray.600">
                    <LinkOverlay asChild>
                      <Link to={`/users/${authorId}`}>@{authorUserName}</Link>
                    </LinkOverlay>
                    &bull;
                    {createdAt !== updatedAt ? (
                      <> Updated: {new Date(updatedAt).toLocaleString()}</>
                    ) : (
                      <> Created: {new Date(createdAt).toLocaleString()}</>
                    )}
                  </Text>
                </>
              ) : null}
            </SkeletonText>
          </Box>
        </Flex>
      </LinkBox>
      <Stack>
        <Separator />
        <Flex justifyContent="space-between">
          <PostCardRating
            id={post.id}
            likes={post.stars().totalCount || 0}
            hasRated={!!post.hasStarred}
            toggleRating={async (id: string) => {
              if (post.hasStarred === false) {
                await sq.mutate(m => m.postStar({ postId: id }));
              } else if (post.hasStarred === true) {
                await sq.mutate(m => m.postUnstar({ postId: id }));
              }
            }}
          />

          <Menu.Root>
            {/* v3's IconButton has no `icon` prop; the glyph is a child. */}
            <Menu.Trigger asChild>
              <IconButton
                size="sm"
                color="gray.600"
                aria-label="Share"
                variant="ghost"
              >
                <FaRegShareSquare />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {/* Same for MenuItem's `icon`: v2's leading-icon span is a
                      plain child in v3, spaced by the item's own gap. */}
                  <Menu.Item
                    onSelect={() => {
                      // Copy to clipboard
                      navigator.clipboard.writeText(window.location.href);

                      notify.toast({
                        title: 'Share',
                        status: 'info',
                        description: 'Link copied to clipboard.'
                      });
                    }}
                    value="copy-link"
                  >
                    <ExternalLinkIcon />
                    Copy Link
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
        <Separator />
      </Stack>
      <Box
        display={{
          base: 'block',
          xl: 'none'
        }}
      >
        <TableOfContent />
      </Box>
      {/* Placeholder for Editor Component */}
      {/* `noOfLines` survived into v3 on SkeletonText and is not `lineClamp`,
          which the codemod substituted: the count is how many placeholder
          lines to draw, not a text clamp. `skeletonHeight` is gone; each line
          hard-codes `height: "4"` ahead of the spread, so a `height` prop is
          the way back to v2's 6 — but only while loading, because the loaded
          branch passes no height and would otherwise clip the editor. */}
      <SkeletonText
        loading={!isSafe}
        noOfLines={15}
        gap="4"
        height={isSafe ? undefined : '6'}
      >
        {/* v2 handed the children to the FIRST placeholder line and `undefined`
            to the other fourteen. v3 spreads the rest props — children
            included — into every line, so the MDX editor would mount fifteen
            times behind `visibility: hidden`, each one firing `onMdast` into
            toc.setValue. Withholding the child until the query is safe keeps it
            mounted exactly once, as in v2; the one difference is that it now
            mounts with the post's content rather than mounting empty first. */}
        {isSafe ? (
          <UncontrolledMdxEditor
            key={mdxKey}
            value={parsedContext}
            isEditing={post.isOwner}
            onMdast={mdast => {
              toc.setValue(mdast);
            }}
            onUpdateValue={(_, value) => {
              setValues({
                ...values,
                content: value
              });
            }}
          />
        ) : null}
      </SkeletonText>
    </Stack>
  );
};

export default DocsPage;

export const pageConfig: PageConfig = {
  label: 'Experiment',
  icon: 'FaFlask',
  withoutJaenFrameStickyHeader: true
};

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`;

export { Head } from 'jaen';
