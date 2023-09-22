import {
  Box,
  Card,
  HStack,
  Heading,
  Image,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text
} from '@chakra-ui/react';
import { FC, ReactNode, useState } from 'react';
import { IPostPreviewProps } from '../../types/post';
import PostPreviewRating from './PostPreviewRating';
import PostPreviewManageMenu from './PostPreviewManageMenu';
import Link from '../../../../shared/components/Link';
import { useAuthenticationContext } from '@atsnek/jaen';
import PostPreviewPrivacy from './PostPreviewPrivacy';

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
  id,
  slug,
  avatarUrl,
  profile,
  createdAt,
  stars,
  hasRated,
  hideAuthor,
  title,
  summary,
  toggleRating,
  canManage,
  privacy,
  showPrivacy,
  wrapperProps
}) => {
  const isAuthor = useAuthenticationContext().user?.id === profile.id;
  const [isRating, setIsRating] = useState(false);

  const handleRating = async () => {
    if (isRating || isAuthor) return;
    setIsRating(true);
    await toggleRating(id);
    setIsRating(false);
  };

  let ratingComp: ReactNode = (
    <PostPreviewRating
      id={id}
      likes={stars}
      toggleRating={handleRating}
      isRating={isRating}
      hasRated={hasRated}
      isPostManagable={canManage && false}
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
        {avatarUrl && avatarUrl?.length > 0 && (
          <Image
            {...postCardPreviewStyling.previewImage}
            src={avatarUrl}
            borderRadius="md"
            objectFit="cover"
          />
        )}
        <Box>
          {!hideAuthor && (
            <Link
              variant="hover-theme"
              fontSize="sm"
              color="components.postPreview.author.color"
              href={`/user/${profile.username}`}
            >
              @{profile.username}
            </Link>
          )}
          <Heading
            as="h5"
            size="sm"
            transition="color 0.2s ease-in-out"
            flex={1}
            w={{ base: 'full', md: 'auto' }}
          >
            <LinkOverlay href={`/post/${slug}`}>{title}</LinkOverlay>
          </Heading>
        </Box>
      </HStack>

      <Text
        {...postCardPreviewStyling.summary}
        flexGrow={1}
        opacity={0.75}
        className="sd-pp-summary"
        transition="opacity 0.2s ease-in-out"
      >
        {summary}
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
            {createdAt}
          </Text>
          {showPrivacy && <PostPreviewPrivacy privacy={privacy} />}
        </HStack>
        <Box pointerEvents="all">
          {canManage && false ? <PostPreviewManageMenu /> : ratingComp}
        </Box>
      </HStack>
    </LinkBox>
  );
};

export default PostCardPreview;

export { postCardPreviewStyling };
