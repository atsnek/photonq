import {
  PageConfig,
  PageProps,
  osg,
  useNotificationsContext
} from '@atsnek/jaen';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { CheckIcon, DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons';
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

const useId = () => {
  const [id, setId] = useState<string>(Math.random().toString(36).substring(2));

  const refresh = () => setId(Math.random().toString(36).substring(2));

  return [id, refresh] as const;
};

const DocsPage: React.FC<PageProps> = ({ params }) => {
  const notify = useNotificationsContext();

  const [mdxKey, refreshMdxKey] = useId();

  const [_, { data, isLoading, refetch, isSafe }] = useLazyQuery(sq);

  const toc = useTOCContext();

  useEffect(() => {
    refetch();
  }, [params.slug]);

  const post = data.post({ where: { slug: params.slug } });

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

  useEffect(() => {
    if (values.content) {
      try {
        toc.setValue(JSON.parse(values.content));
      } catch {
        toc.setValue(undefined);
      }
    } else {
      toc.setValue(undefined);
    }
  }, [values.content]);

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

  const parsedContent = useMemo(() => {
    try {
      return JSON.parse(values.content || '');
    } catch {
      return undefined;
    }
  }, [values.content]);

  return (
    <Stack key={post.id} spacing={8}>
      <Stack spacing="4">
        <Flex justifyContent="space-between">
          <HStack spacing="1">
            <Icon
              as={FaUsers}
              display="inline-block"
              color="brand.500"
              mr="2"
            />
            <Text color="gray.600">Community experiment</Text>
          </HStack>
        </Flex>

        <Stack display={post.isOwner ? 'flex' : 'none'}>
          <Divider />
          <Flex justifyContent="space-between" alignItems="center">
            {post.privacy === 'PRIVATE' ? (
              <Button
                leftIcon={<FaRocket />}
                variant="link"
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
                Publish
              </Button>
            ) : (
              <Button
                leftIcon={<CheckIcon color="green.500" />}
                variant="link"
                colorScheme="green"
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
                Published
              </Button>
            )}

            <ButtonGroup flexDir={['column', 'row']}>
              <Button
                variant="outline"
                isDisabled={!hasChanges}
                isLoading={isSaving}
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
                  colorScheme="red"
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
                icon={<DeleteIcon />}
                aria-label="Delete"
                variant="ghost"
                colorScheme="red"
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
                }}
              />
            </ButtonGroup>
          </Flex>
          <Divider />
        </Stack>

        <HStack spacing="4">
          <SkeletonCircle
            boxSize="unset"
            isLoaded={isSafe && !isImageUploading}
            borderRadius="md"
          >
            <Avatar
              size="md"
              borderRadius="md"
              src={values.avatarURL || undefined}
              name={values.title}
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
            />
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

      <LinkBox as={Flex} alignItems="center">
        <SkeletonCircle boxSize="unset" isLoaded={isSafe}>
          <Avatar
            size="md"
            src={post.user().profile.avatarUrl || ''}
            name={post.user().profile.displayName}
          />
        </SkeletonCircle>

        <Box ml={2}>
          <SkeletonText isLoaded={isSafe}>
            <Text>{post.user().profile.displayName}</Text>

            <Text fontSize="sm" color="gray.600">
              <LinkOverlay as={Link} to={`/users/${post.user().id}`}>
                @{post.user().profile.userName}
              </LinkOverlay>
              &bull;
              {post.createdAt !== post.updatedAt ? (
                <> Updated: {new Date(post.updatedAt).toLocaleString()}</>
              ) : (
                <> Created: {new Date(post.createdAt).toLocaleString()}</>
              )}
            </Text>
          </SkeletonText>
        </Box>
      </LinkBox>

      <Stack>
        <Divider />
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

          <Menu>
            <MenuButton
              as={IconButton}
              size="sm"
              color="gray.600"
              icon={<FaRegShareSquare />}
              aria-label="Share"
              variant="ghost"
            />
            <MenuList>
              <MenuItem
                icon={<ExternalLinkIcon />}
                onClick={() => {
                  // Copy to clipboard
                  navigator.clipboard.writeText(window.location.href);

                  notify.toast({
                    title: 'Share',
                    status: 'info',
                    description: 'Link copied to clipboard.'
                  });
                }}
              >
                Copy Link
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Divider />
      </Stack>

      <TableOfContent />

      {/* Placeholder for Editor Component */}
      <SkeletonText
        isLoaded={isSafe}
        noOfLines={15}
        spacing="4"
        skeletonHeight="6"
      >
        <UncontrolledMdxEditor
          key={mdxKey}
          value={parsedContent}
          isEditing={post.isOwner}
          onUpdateValue={value => {
            toc.setValue(value);

            setValues({
              ...values,
              content: JSON.stringify(value)
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

export { Head } from '@atsnek/jaen';
