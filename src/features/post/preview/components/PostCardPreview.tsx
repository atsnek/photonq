import {
  Box,
  Card,
  HStack,
  Heading,
  Image,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Spacer,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import { FC, ReactNode, useState } from 'react';
import { IPostPreviewProps } from '../../types/post';
import PostPreviewRating from './PostPreviewRating';
import PostPreviewManageMenu from './PostPreviewManageMenu';
import Link from '../../../../shared/components/Link';
import { useAuthenticationContext } from '@atsnek/jaen';
import PostPreviewPrivacy from './PostPreviewPrivacy';
import PostPreviewLanguage from './PostPreviewLanguage';

const postCardPreviewStyling = {
  wrapper: {
    variant: 'outline',
    p: 5,
    borderRadius: 'xl'
  },
  topHStack: {
    w: 'full',
    spacing: 3
  },
  previewImage: {
    boxSize: '3rem'
  },
  summary: {
    mt: 2
  },
  bottomHStack: {
    mt: 4,
    justifyContent: 'space-between'
  }
};

/**
 * Component for displaying a post preview.
 */
const PostCardPreview: FC<IPostPreviewProps<LinkBoxProps>> = ({
  post,
  hideAuthor,
  toggleRating,
  showPrivacy,
  togglePostPrivacy,
  isTogglingPostPrivacy,
  deletePost,
  isDeletingPost,
  wrapperProps
}) => {
  const isAuthenticated = useAuthenticationContext().user !== null;
  const isAuthor = useAuthenticationContext().user?.id === post.profile.id;
  const manageBtnDisplay = useBreakpointValue({ base: 'none', xl: 'initial' });
  const [isRating, setIsRating] = useState(false);

  const handleRating = async () => {
    if (isRating || isAuthor) return;
    setIsRating(true);
    await toggleRating(post.id);
    setIsRating(false);
  };

  let ratingComp: ReactNode = (
    <PostPreviewRating
      id={post.id}
      likes={post.stars}
      toggleRating={handleRating}
      isRating={isRating}
      hasRated={post.hasRated}
      canRate={!post.canManage && isAuthenticated}
      isAuthor={isAuthor}
    />
  );

  return (
    // Two possible ways to handle y overflow:
    // 1) Use overflow="hidden" and textOverflow="ellipsis" on the Card component
    // 2) Cut off the text on the server side (easier way)
    <LinkBox
      {...postCardPreviewStyling.wrapper}
      as={Card}
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
      color="shared.text.default"
      transition="all 0.2s cubic-bezier(.17,.67,.83,.67)"
      {...wrapperProps}
    >
      <HStack {...postCardPreviewStyling.topHStack}>
        {post.avatarUrl && post.avatarUrl?.length > 0 && (
          <Image
            {...postCardPreviewStyling.previewImage}
            src={post.avatarUrl}
            borderRadius="md"
            objectFit="cover"
          />
        )}
        <Box maxW="55%">
          {!hideAuthor && (
            <Link
              variant="hover-theme"
              fontSize="sm"
              color="components.postPreview.author.color"
              href={`/user/${post.profile.username}`}
            >
              @{post.profile.username}
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
            <LinkOverlay href={`/experiments/${post.slug}`}>
              {post.title}
            </LinkOverlay>
          </Heading>
        </Box>
        <Spacer />
        {post.canManage && (
          <PostPreviewManageMenu
            postId={post.id}
            postPrivacy={post.privacy}
            togglePostPrivacy={id =>
              togglePostPrivacy(
                id,
                post.privacy === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC'
              )
            }
            isTogglingPostPrivacy={isTogglingPostPrivacy}
            display={manageBtnDisplay}
            deletePost={deletePost}
            isDeletingPost={isDeletingPost}
          />
        )}
      </HStack>

      <Text
        {...postCardPreviewStyling.summary}
        flexGrow={1}
        opacity={0.75}
        className="sd-pp-summary"
        transition="opacity 0.2s ease-in-out"
      >
        {post.summary}
      </Text>
      <HStack
        zIndex={2}
        {...postCardPreviewStyling.bottomHStack}
        // Prevents the date from being placed on top of the link overlay
        pointerEvents="none"
        justifyContent="space-between"
      >
        <HStack opacity={0.8}>
          <Text fontSize={12} color="components.postPreview.date.color">
            {post.createdAt}
          </Text>
          <PostPreviewLanguage language={post.language} />
          {showPrivacy && <PostPreviewPrivacy privacy={post.privacy} />}
        </HStack>
        <Box pointerEvents="all">{ratingComp}</Box>
      </HStack>
    </LinkBox>
  );
};

export default PostCardPreview;

export { postCardPreviewStyling };
