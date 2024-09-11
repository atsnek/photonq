import { Post, Privacy } from '@/clients/social/src/schema.generated';
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  VStack,
  Wrap
} from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';
import { FC, useState } from 'react';
import PostCardRating from './PostCardRating';
import { useAuth } from 'jaen';
import { sq } from '@/clients/social';
import NoSSR from '../NoSSR';
import {
  DeleteIcon,
  SettingsIcon,
  ViewIcon,
  ViewOffIcon
} from '@chakra-ui/icons';

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
      key={post.id}
      as={Card}
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
    >
      <CardBody as={Stack} justifyContent="end">
        <HStack justifyContent="space-between">
          <HStack w="full" spacing="3">
            <Avatar
              boxSize="3rem"
              borderRadius="md"
              objectFit="cover"
              src={post.avatarURL}
              name={post.title}
            />

            <Stack>
              {!hideAuthor && (
                <SkeletonText isLoaded={isLoaded} noOfLines={1} minW="50px">
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
                <LinkOverlay as={Link} to={`/experiments/${post.slug}`}>
                  {post.title}
                </LinkOverlay>
              </Heading>
            </Stack>
          </HStack>

          {post.isOwner && (
            <Menu>
              <MenuButton
                as={IconButton}
                variant="outline"
                mb="auto"
                size="sm"
                icon={<SettingsIcon />}
              />
              <MenuList>
                <MenuItem
                  onClick={() =>
                    onSetPrivacy(
                      post.id,
                      post.privacy === Privacy.PUBLIC
                        ? Privacy.PRIVATE
                        : Privacy.PUBLIC
                    )
                  }
                  icon={
                    post.privacy === Privacy.PUBLIC ? (
                      <ViewOffIcon color="green.600" />
                    ) : (
                      <ViewIcon color="yellow.300" />
                    )
                  }
                >
                  {post.privacy === Privacy.PUBLIC
                    ? 'Make Private'
                    : 'Make Public'}
                </MenuItem>
                <MenuItem
                  icon={<DeleteIcon color="red.500" />}
                  onClick={() => onDelete(post.id)}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>

        <SkeletonText isLoaded={isLoaded}>
          <Text
            mt="2"
            flexGrow={1}
            noOfLines={2}
            opacity={0.75}
            className="sd-pp-summary"
            transition="opacity 0.2s ease-in-out"
          >
            {post.summary}
          </Text>
        </SkeletonText>

        <SkeletonText isLoaded={isLoaded} noOfLines={1}>
          <HStack mt="4" justifyContent="space-between">
            <Wrap>
              <Text fontSize={12} color="gray.600">
                <NoSSR>{new Date(post.createdAt).toLocaleDateString()}</NoSSR>
              </Text>

              <Badge colorScheme="gray" borderRadius="md">
                {post.language}
              </Badge>

              <Badge
                display={post.isOwner ? 'block' : 'none'}
                size="sm"
                borderRadius="md"
                colorScheme={
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
      </CardBody>
    </LinkBox>
  );
};

export default PostCard;
