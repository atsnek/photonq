import { Post, Privacy } from '@/clients/social/src/schema.generated';
import {
  Badge,
  Box,
  Card,
  HStack,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Text,
  VStack,
  Wrap
} from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';
import { FC } from 'react';
import PostCardRating from './PostCardRating';
import { useAuth } from '@atsnek/jaen';
import { sq } from '@/clients/social';
import NoSSR from '../NoSSR';

interface PostCardProps {
  hideAuthor?: boolean;
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ hideAuthor, post }) => {
  return (
    <LinkBox
      as={Card}
      p="5"
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
      <HStack w="full" spacing="3">
        <VStack flex={1} alignItems="flex-start">
          {post.avatarURL && post.avatarURL?.length > 0 && (
            <Image
              boxSize="3rem"
              src={post.avatarURL}
              borderRadius="md"
              objectFit="cover"
            />
          )}
          <Box maxW="55%">
            {!hideAuthor && (
              <Link
                variant="hover-theme"
                fontSize="sm"
                href={`/users/${post.user().id}`}
              >
                @{post.user().profile.userName}
              </Link>
            )}
            <Heading
              as="h5"
              size="sm"
              transition="color 0.2s ease-in-out"
              flex={1}
              w={{ base: 'full', md: 'auto' }}
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              <LinkOverlay as={Link} to={`/experiments/${post.slug}`}>
                {post.title}
              </LinkOverlay>
            </Heading>
          </Box>
        </VStack>
      </HStack>

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

      <HStack mt="4" justifyContent="space-between">
        <Wrap>
          <Text fontSize={12} color="components.postPreview.date.color">
            <NoSSR>{new Date(post.createdAt).toLocaleDateString()}</NoSSR>
          </Text>

          <Badge colorScheme="gray" borderRadius="md">
            {post.language}
          </Badge>

          <Badge
            display={post.isOwner ? 'block' : 'none'}
            variant="outline"
            size="sm"
            borderRadius="md"
            colorScheme="blue"
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
    </LinkBox>
  );
};

export default PostCard;
