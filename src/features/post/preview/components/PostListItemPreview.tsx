import { FC } from 'react';
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
  id,
  publicationDate,
  author,
  hideAuthor,
  title,
  previewImage = 'https://picsum.photos/200',
  summary,
  hasLiked,
  toggleLike,
  likes,
  url,
  canManage,
  wrapperProps
}) => {
  return (
    <LinkBox
      key={id}
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
          {previewImage && (
            <Image
              display={{ base: 'none', md: 'initial' }}
              boxSize="75px"
              objectFit="cover"
              src={previewImage}
              borderRadius="md"
            />
          )}
          <VStack alignItems="flex-start">
            <LinkOverlay
              href={url}
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
                {title}
              </Heading>
            </LinkOverlay>
            <Text
              color="components.postPreview.listItem.initial.date.color"
              fontSize="sm"
            >
              {publicationDate}
            </Text>
          </VStack>
          <Spacer />
          {canManage && (
            <PostPreviewManageMenu alignSelf="flex-start" minW="fit-content" />
          )}
        </HStack>
        <Text
          maxW="75%"
          color="components.postPreview.listItem.initial.summary.color"
        >
          {summary}
        </Text>
        <HStack {...postListItemPreviewStyling.bottomHStack}>
          {!hideAuthor && (
            <Link
              href={`/profile/${author}`}
              color="components.postPreview.author.color"
              fontSize="sm"
              variant="hover-theme"
            >
              @{author}
            </Link>
          )}
          <PostPreviewRating
            id={id}
            likes={likes}
            toggleLike={toggleLike}
            hasLiked={hasLiked}
            isPostManagable={canManage}
            useHighContrast
          />
        </HStack>
      </VStack>
    </LinkBox>
  );
};

export default PostListItemPreview;
export { postListItemPreviewStyling };
