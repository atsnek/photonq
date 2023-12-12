import { FC, useState } from 'react';
import {
  HStack,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Spacer,
  StackProps,
  Text,
  VStack
} from '@chakra-ui/react';
import PostPreviewManageMenu from './PostPreviewManageMenu';
import PostPreviewRating from './PostPreviewRating';
import Link from '../../../../shared/components/Link';
import { IPostPreviewProps } from '../../types/post';
import { useAuthenticationContext } from '@atsnek/jaen';
import PostPreviewPrivacy from './PostPreviewPrivacy';
import PostPreviewLanguage from './PostPreviewLanguage';

const postListItemPreviewStyling = {
  wrapper: {
    w: 'full',
    h: 'max-content',
    p: 5,
    py: 7,
    borderRadius: 'lg',
    border: '1px solid',
    borderColor: 'components.postPreview.listItem.initial.borderColor'
  },
  outerVStack: {
    spacing: 3,
    alignItems: 'flex-start'
  },
  topHStack: {
    spacing: 4,
    w: 'full'
  },
  image: {
    display: { base: 'none', md: 'initial' },
    boxSize: '75px',
    borderRadius: 'md'
  },
  bottomHStack: {
    spacing: 5
  }
};

/**
 * Component for displaying a preview of a post in form of a list item.
 */
const PostListItemPreview: FC<IPostPreviewProps<StackProps>> = ({
  post,
  wrapperProps,
  showPrivacy,
  togglePostPrivacy,
  isTogglingPostPrivacy,
  deletePost,
  isDeletingPost,
  toggleRating,
  hideAuthor
}) => {
  const [isRating, setIsRating] = useState(false);

  const isAuthenticated = useAuthenticationContext().user !== null;
  const isAuthor = useAuthenticationContext().user?.id === post.profile.id;

  const handleRating = async () => {
    if (isRating || isAuthor) return;
    setIsRating(true);
    await toggleRating(post.id);
    setIsRating(false);
  };

  return (
    <LinkBox
      key={post.id}
      {...postListItemPreviewStyling.wrapper}
      bgColor="components.postPreview.listItem.initial.bgColor"
      borderColor="components.postPreview.listItem.initial.borderColor"
      _hover={{
        borderColor: 'components.postPreview.listItem._hover.borderColor',
        boxShadow: 'md'
      }}
      transition="border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
      {...wrapperProps}
    >
      <VStack spacing={3} alignItems="flex-start">
        <HStack spacing={4} w="full">
          {post.avatarUrl && post.avatarUrl.length > 0 && (
            <Image
              display={{ base: 'none', md: 'initial' }}
              boxSize="75px"
              objectFit="cover"
              src={post.avatarUrl}
              borderRadius="md"
            />
          )}
          <VStack alignItems="flex-start">
            <HStack>
              <LinkOverlay
                href={`/experiments/${post.slug}`}
                _hover={{
                  h5: {
                    color: 'components.postPreview.listItem._hover.title.color'
                  }
                }}
              >
                <Heading
                  as="h5"
                  size="sm"
                  color="components.postPreview.listItem.initial.title.color"
                  transition="color 0.2s ease-in-out"
                >
                  {post.title}
                </Heading>
              </LinkOverlay>
              <PostPreviewLanguage language={post.language} />
            </HStack>
            <HStack>
              <Text
                color="components.postPreview.listItem.initial.date.color"
                fontSize="sm"
              >
                {post.createdAt}
              </Text>
              {showPrivacy && (
                <PostPreviewPrivacy privacy={post.privacy} opacity={0.8} />
              )}
            </HStack>
          </VStack>
          <Spacer />
          {post.canManage && (
            <PostPreviewManageMenu
              alignSelf="flex-start"
              minW="fit-content"
              postPrivacy={post.privacy}
              togglePostPrivacy={id =>
                togglePostPrivacy(
                  id,
                  post.privacy === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC'
                )
              }
              isTogglingPostPrivacy={isTogglingPostPrivacy}
              deletePost={deletePost}
              isDeletingPost={isDeletingPost}
              postId={post.id}
            />
          )}
        </HStack>
        <Text
          maxW="75%"
          color="components.postPreview.listItem.initial.summary.color"
        >
          {post.summary}
        </Text>
        <HStack {...postListItemPreviewStyling.bottomHStack}>
          {!hideAuthor && (
            <Link
              href={`/user/${post.profile.username}`}
              color="components.postPreview.author.color"
              fontSize="sm"
              variant="hover-theme"
            >
              @{post.profile.username}
            </Link>
          )}
          <PostPreviewRating
            id={post.id}
            likes={post.stars}
            toggleRating={handleRating}
            hasRated={post.hasRated}
            canRate={!post.canManage && isAuthenticated}
            isAuthor={isAuthor}
            useHighContrast
          />
        </HStack>
      </VStack>
    </LinkBox>
  );
};

export default PostListItemPreview;
export { postListItemPreviewStyling };
