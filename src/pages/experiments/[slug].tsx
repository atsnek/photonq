import { PageConfig, PageProps, osg, useNotificationsContext } from 'jaen';
import {
  Steps,
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
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  Separator,
  Portal,
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
import { LuCheck, LuExternalLink, LuTrash2 } from 'react-icons/lu';

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
            <Breadcrumb.Link asChild><Link to="/experiments">
                <HStack gap="1">
                  <Icon display="inline-block" color="brand.500" mr="2" asChild><FaUsers /></Icon>
                  <Text color="gray.600">Community Experiments</Text>
                </HStack>
              </Link></Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator /><Breadcrumb.Item>
            <Breadcrumb.Link href="#">{post.title}</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <Stack gap="4">
        <Stack display={post.isOwner ? 'flex' : 'none'}>
          <Separator />
          <Flex justifyContent="space-between" alignItems="center">
            {post.privacy === 'PRIVATE' ? (
              <Button
                variant='plain'
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
                }}><FaRocket />Publish
                              </Button>
            ) : (
              <Button
                variant='plain'
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
                }}><Icon color="green.500" asChild><LuCheck /></Icon>Published
                              </Button>
            )}

            <ButtonGroup flexDir={['column', 'row']}>
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
                onValueChange={async e => {
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

                      navigate(`/users/${post.user().id}`);
                    }
                  }
                }}><LuTrash2 /></IconButton>
            </ButtonGroup>
          </Flex>
          <Separator />
        </Stack>

        <HStack gap="4">
          <SkeletonCircle
            boxSize="unset"
            isLoaded={isSafe && !isImageUploading}
            borderRadius="md"
          >
            <Avatar.Root
              size="md"
              borderRadius="md"
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
              }}><Avatar.Fallback name={values.title} /><Avatar.Image src={values.avatarURL || undefined} /></Avatar.Root>
          </SkeletonCircle>

          <SkeletonText isLoaded={isSafe}>
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
          </SkeletonText>
        </HStack>

        <SkeletonText isLoaded={isSafe}>
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
        </SkeletonText>
      </Stack>
      <LinkBox alignItems="center" asChild><Flex>
          <SkeletonCircle boxSize="unset" isLoaded={isSafe}>
            <Avatar.Root size="md"><Avatar.Fallback name={post.user().profile.displayName} /><Avatar.Image src={post.user().profile.avatarUrl || ''} /></Avatar.Root>
          </SkeletonCircle>
          <Box ml={2}>
            <SkeletonText isLoaded={isSafe}>
              <Text>{post.user().profile.displayName}</Text>

              <Text fontSize="sm" color="gray.600">
                <LinkOverlay asChild><Link to={`/users/${post.user().id}`}>@{post.user().profile.userName}
                  </Link></LinkOverlay>
                &bull;
                {post.createdAt !== post.updatedAt ? (
                  <> Updated: {new Date(post.updatedAt).toLocaleString()}</>
                ) : (
                  <> Created: {new Date(post.createdAt).toLocaleString()}</>
                )}
              </Text>
            </SkeletonText>
          </Box>
        </Flex></LinkBox>
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
            <Menu.Trigger asChild><IconButton
                size="sm"
                color="gray.600"
                icon={<FaRegShareSquare />}
                aria-label="Share"
                variant="ghost"></IconButton></Menu.Trigger>
            <Portal><Menu.Positioner><Menu.Content>
                  <Menu.Item
                    icon={<LuExternalLink />}
                    onSelect={() => {
                      // Copy to clipboard
                      navigator.clipboard.writeText(window.location.href);

                      notify.toast({
                        title: 'Share',
                        status: 'info',
                        description: 'Link copied to clipboard.'
                      });
                    }}
                    value='item-0'>
                    Copy Link
                  </Menu.Item>
                </Menu.Content></Menu.Positioner></Portal>
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
      <SkeletonText
        isLoaded={isSafe}
        lineClamp={15}
        gap="4"
        skeletonHeight="6"
      >
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
