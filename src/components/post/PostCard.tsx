import { Post, Privacy } from '@/clients/social/src/schema.generated';
import {
  Steps,
  Avatar,
  Badge,
  Box,
  Card,
  HStack,
  Heading,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Menu,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  VStack,
  Wrap,
  Icon,
  Portal,
} from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';
import { FC, useState } from 'react';
import PostCardRating from './PostCardRating';
import { useAuth } from 'jaen';
import { sq } from '@/clients/social';
import NoSSR from '../NoSSR';
import { LuEye, LuEyeOff, LuSettings, LuTrash2 } from 'react-icons/lu';

interface PostCardProps {
  hideAuthor?: boolean;
  post: Post;
  isSafe?: boolean;
  onDelete: (id: string) => void;
  onSetPrivacy: (id: string, privacy: Privacy) => void;
}

const PostCard: FC<PostCardProps> = ({
  hideAuthor,
  post,
  isSafe,
  onDelete,
  onSetPrivacy
}) => {
  const isLoaded = isSafe !== undefined ? isSafe : true;

  return (
    <LinkBox
      variant="outline"
      borderRadius="xl"
      _hover={{
        //! transforming the card causes the menu to be cut off by the sibling card
        // transform: 'scale(1.01)',
        boxShadow: 'md',
        borderColor: 'theme.500',
        h5: {
          color: 'theme.500'
        },
        '.sd-pp-summary': {
          opacity: 1
        }
      }}
      asChild><Card key={post.id}>
            <Card.Body justifyContent="end" asChild><Stack>
                <HStack justifyContent="space-between">
                  <HStack w="full" gap="3">
                    <Avatar.Root boxSize="3rem" borderRadius="md" objectFit="cover"><Avatar.Fallback name={post.title} /><Avatar.Image src={post.avatarURL} /></Avatar.Root>

                    <Stack>
                      {!hideAuthor && (
                        <SkeletonText isLoaded={isLoaded} lineClamp={1} minW="50px">
                          <Link
                            noOfLines={1}
                            variant="hover-theme"
                            fontSize="sm"
                            href={`/users/${post.user().id}`}
                          >
                            @{post.user().profile.userName}
                          </Link>
                        </SkeletonText>
                      )}
                      <Heading
                        as="h5"
                        size="sm"
                        transition="color 0.2s ease-in-out"
                        flex={1}
                        w={{ base: 'full', md: 'auto' }}
                      >
                        <LinkOverlay asChild><Link to={`/experiments/${post.slug}`}>
                            {post.title}
                          </Link></LinkOverlay>
                      </Heading>
                    </Stack>
                  </HStack>

                  {post.isOwner && (
                    <Menu.Root>
                      <Menu.Trigger asChild><IconButton variant="outline" mb="auto" size="sm" icon={<LuSettings />}></IconButton></Menu.Trigger>
                      <Portal><Menu.Positioner><Menu.Content>
                            <Menu.Item
                              onSelect={() =>
                                onSetPrivacy(
                                  post.id,
                                  post.privacy === Privacy.PUBLIC
                                    ? Privacy.PRIVATE
                                    : Privacy.PUBLIC
                                )
                              }
                              icon={
                                post.privacy === Privacy.PUBLIC ? (
                                  <Icon color="green.600" asChild><LuEyeOff /></Icon>
                                ) : (
                                  <Icon color="yellow.300" asChild><LuEye /></Icon>
                                )
                              }
                              value='item-0'>
                              {post.privacy === Privacy.PUBLIC
                                ? 'Make Private'
                                : 'Make Public'}
                            </Menu.Item>
                            <Menu.Item
                              icon={<Icon color="red.500" asChild><LuTrash2 /></Icon>}
                              onSelect={() => onDelete(post.id)}
                              value='item-1'>
                              Delete
                            </Menu.Item>
                          </Menu.Content></Menu.Positioner></Portal>
                    </Menu.Root>
                  )}
                </HStack>
                <SkeletonText isLoaded={isLoaded}>
                  <Text
                    mt="2"
                    flexGrow={1}
                    lineClamp={2}
                    opacity={0.75}
                    className="sd-pp-summary"
                    transition="opacity 0.2s ease-in-out"
                  >
                    {post.summary}
                  </Text>
                </SkeletonText>
                <SkeletonText isLoaded={isLoaded} lineClamp={1}>
                  <HStack mt="4" justifyContent="space-between">
                    <Wrap>
                      <Text fontSize={12} color="gray.600">
                        <NoSSR>{new Date(post.createdAt).toLocaleDateString()}</NoSSR>
                      </Text>

                      <Badge colorPalette="gray" borderRadius="md">
                        {post.language}
                      </Badge>

                      <Badge
                        display={post.isOwner ? 'block' : 'none'}
                        size="sm"
                        borderRadius="md"
                        colorPalette={
                          post.privacy === Privacy.PUBLIC ? 'yellow' : 'green'
                        }
                      >
                        {post.privacy === Privacy.PUBLIC && 'Public'}
                        {post.privacy === Privacy.PRIVATE && 'Private'}
                      </Badge>
                    </Wrap>

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
                  </HStack>
                </SkeletonText>
              </Stack></Card.Body>
          </Card></LinkBox>
  );
};

export default PostCard;
