import { Box, Card, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { userPreviewCardStyling } from './UserPreviewCard';

/**
 * Component for displaying a skeleton of a user preview card.
 */
const UserPreviewCardSkeleton: FC = () => {
  return (
    <Box as={Card} {...userPreviewCardStyling.card}>
      <HStack {...userPreviewCardStyling.outerHStack}>
        <Skeleton {...userPreviewCardStyling.avatar} />
        <VStack {...userPreviewCardStyling.vstack}>
          <HStack>
            <Skeleton w="80px" h="1rem" />
            <Skeleton w="55px" h="0.75rem" />
          </HStack>
          <Skeleton w="100px" h="0.75rem" />
          <HStack {...userPreviewCardStyling.stats.hstack}>
            <Skeleton boxSize="12px" />
            <Skeleton w="50px" h="0.75rem" />
            <Skeleton ml={3} boxSize="12px" />
            <Skeleton w="50px" h="0.75rem" />
            <Skeleton ml={3} boxSize="12px" />
            <Skeleton w="50px" h="0.75rem" />
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default UserPreviewCardSkeleton;
