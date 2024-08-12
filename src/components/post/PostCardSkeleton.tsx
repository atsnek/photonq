import { Card, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { FC } from 'react';

interface PostCardSkeletonProps {
  hideAuthor?: boolean;
}

const PostCardSkeleton: FC<PostCardSkeletonProps> = ({ hideAuthor }) => {
  return (
    <Card variant="outline" p="5" borderRadius="xl">
      <HStack w="full" spacing="3">
        <Skeleton boxSize="3rem" />
        <VStack flex={1} alignItems="flex-start">
          {!hideAuthor && <Skeleton w="25%" h="0.875rem" />}
          <Skeleton w="80%" h="1rem" mt={2} />
        </VStack>
      </HStack>
      <Skeleton w="100%" h="5rem" mt="2" />
      <HStack mt="4" justifyContent="space-between">
        <Skeleton w="20%" h="0.875rem" />
        <Skeleton w="10%" h="0.875rem" />
      </HStack>
    </Card>
  );
};

export default PostCardSkeleton;
