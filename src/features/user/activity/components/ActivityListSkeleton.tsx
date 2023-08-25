import { Box, HStack, Skeleton, Spacer } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { activityListStyling } from './ActivityList';
import Stepper from '../../../../shared/components/stepper/Stepper';
import { TStepperSection } from '../../../../shared/components/stepper/types/stepper';

/**
 * Skeleton component for displaying a list of activities.
 */
const ActivityListSkeleton: FC = () => {
  const sections: TStepperSection[] = Array(2).fill({
    title: <Skeleton w="min(10%, 200px)" h="12px" />,
    items: Array(4).fill({
      title: (
        <HStack>
          <Skeleton w="max(45%, 200px)" h="12px" />
          <Spacer />
          <Skeleton w="50px" h="12px" />
        </HStack>
      ),

      icon: <Skeleton boxSize="13px" />
    })
  });

  return (
    <Box>
      <Skeleton {...activityListStyling.title} h="20px" w="min(10%, 200px)" />
      <Stepper sections={sections} />
    </Box>
  );
};
export default memo(ActivityListSkeleton);
