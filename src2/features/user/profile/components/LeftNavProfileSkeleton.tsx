import {
  Divider,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  VStack
} from '@chakra-ui/react';
import { FC, memo } from 'react';
import { leftNavProfileStyling } from './LeftNavProfile';

/**
 * Skeleton component for displaying the left nav of a certain user profile.
 */
const LeftNavProfileSkeleton: FC = () => {
  return (
    <VStack {...leftNavProfileStyling.wrapperStack}>
      <Skeleton w="full" aspectRatio="1 / 1" borderRadius="full" />
      <VStack {...leftNavProfileStyling.userData.stack} w="full">
        <Skeleton
          w="50%"
          h="24px"
          {...leftNavProfileStyling.userData.displayName}
        />
        <Skeleton w="40%" h="14px" mt={2} borderRadius="sm" />
      </VStack>
      <Divider {...leftNavProfileStyling.bioDividers} />
      <Skeleton w="full" h="150px" {...leftNavProfileStyling.bio} />
      <Divider {...leftNavProfileStyling.bioDividers} />
      <Grid {...leftNavProfileStyling.stats.grid} w="full">
        <GridItem as={HStack}>
          <Skeleton w="14px" h="14px" borderRadius="full" />
          <Skeleton w="30%" h="14px" borderRadius="sm" />
        </GridItem>
        <GridItem as={HStack}>
          <Skeleton w="14px" h="14px" borderRadius="full" />
          <Skeleton w="30%" h="14px" borderRadius="sm" />
        </GridItem>
        <GridItem as={HStack}>
          <Skeleton w="14px" h="14px" borderRadius="full" />
          <Skeleton w="30%" h="14px" borderRadius="sm" />
        </GridItem>
        <GridItem as={HStack}>
          <Skeleton w="14px" h="14px" borderRadius="full" />
          <Skeleton w="30%" h="14px" borderRadius="sm" />
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default memo(LeftNavProfileSkeleton);
