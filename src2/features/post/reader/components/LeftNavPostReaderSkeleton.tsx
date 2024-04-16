import { VStack, HStack, Skeleton, Divider, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import LeftNav from '../../../../shared/containers/navigation/LeftNav';
import { leftNavPostReaderStyling } from './LeftNavPostReader';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';

/**
 * Skeleton for the left navigation in the post reader.
 */
const LeftNavPostReaderSkeleton: FC = () => {
  return (
    <LeftNav w="full" isExpanded textAlign="center">
      <VStack spacing={2}>
        <Skeleton {...leftNavPostReaderStyling.avatar} borderRadius="full" />
        <Skeleton h="20px" w="50%" />
        {/* <Skeleton h="20px" w="25%" minW="50px" /> */}
      </VStack>
      <Divider mt={8} />
      <HStack {...leftNavPostReaderStyling.rating.hstack}>
        <TbStar {...leftNavPostReaderStyling.rating.icon} />
        <Skeleton h="18px" w="30px" />
      </HStack>
      <Heading {...leftNavPostReaderStyling.summary.heading} my={3}>
        Post Summary
      </Heading>
      <Skeleton w="75%" minW="75px" h="80px" mx="auto" />
    </LeftNav>
  );
};

export default LeftNavPostReaderSkeleton;
