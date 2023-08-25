import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { postListItemPreviewStyling } from './PostListItemPreview';

interface IPostLIstItemPreviewSkeletonProps {
  hideAuthor?: boolean;
}

/**
 * Component for displaying a post preview skeleton.
 */
const PostListItemPreviewSkeleton: FC<IPostLIstItemPreviewSkeletonProps> = ({
  hideAuthor
}) => {
  return (
    <Box {...postListItemPreviewStyling.wrapper}>
      <VStack {...postListItemPreviewStyling.outerVStack}>
        <HStack {...postListItemPreviewStyling.topHStack}>
          <Skeleton {...postListItemPreviewStyling.image} />
          <VStack flex={1} alignItems="flex-start">
            <Skeleton w="35%" h="0.875rem" />
            <Skeleton w="10%" h="0.875rem" />
          </VStack>
        </HStack>
        <Skeleton w="95%" h="4rem" />
        <HStack w="full" {...postListItemPreviewStyling.bottomHStack}>
          {!hideAuthor && <Skeleton w="10%" h="0.875rem" />}
          <Skeleton w="5%" h="0.875rem" />
        </HStack>
      </VStack>
    </Box>
  );
};

export default PostListItemPreviewSkeleton;
