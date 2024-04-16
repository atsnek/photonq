import {
  Box,
  BoxProps,
  Button,
  Center,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text
} from '@chakra-ui/react';
import { FC, ReactNode, useMemo, useState } from 'react';
import { TActivity, TActivitySection, TActivityType } from '../types/activity';
import { TStepperSection } from '../../../../shared/components/stepper/types/stepper';
import Stepper from '../../../../shared/components/stepper/Stepper';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';
import Link from '../../../../shared/components/Link';
import ActivityListSkeleton from './ActivityListSkeleton';
import TbConfetti from '../../../../shared/components/icons/tabler/TbConfetti';
import TbPencilPlus from '../../../../shared/components/icons/tabler/TbPencilPlus';
import TbPencilShare from '../../../../shared/components/icons/tabler/TbPencilShare';
import TbUserPlus from '../../../../shared/components/icons/tabler/TbUserPlus';
import { TPaginationData } from '../../../../shared/types/pagination';

export const activityListStyling = {
  title: {
    mb: 5
  }
};

//TODO: Adapt icons for the new activity types
const activityIcons: Record<TActivityType, ReactNode> = {
  follow_follow: <TbUserPlus />,
  blog_create: <TbPencilPlus />,
  blog_publish: <TbPencilShare />,
  profile_create: <TbConfetti />,
  star_star: <TbStar />,
  star_unstar: undefined
};

interface IActivityListProps extends BoxProps {
  activity: TPaginationData<TActivity[]>;
  fetchMore?: () => Promise<boolean>;
}

/**
 * Component for displaying a list of activities.
 */
const ActivityList: FC<IActivityListProps> = ({ activity, fetchMore, ...props }) => {
  const [isFetching, setIsFetching] = useState(false);

  const stepperData = useMemo(() => {
    let visibileActivities = 0;
    let stepperData: TStepperSection[] = [];

    const sections: TActivitySection[] = [];

    // for (let i = 0; i < Math.min(currentLimit, activity.items.length); i++) {
    for (const item of activity.items) {
      // const item = activity.items[i];
      const itemDate = new Date(item.timestamp);
      const sectionDate = new Date(itemDate.getFullYear(), itemDate.getMonth()).toISOString();
      const sectionIndex = sections.findIndex(section => section.timestamp === sectionDate);
      if (sectionIndex === -1) {
        sections.push({
          timestamp: sectionDate,
          activities: [item]
        });
      } else {
        sections[sectionIndex].activities.push(item);
      }
    }

    for (const section of sections) {
      const sectionDate = new Date(section.timestamp);
      const sectionTitle = (
        <HStack spacing={1}>
          <Text>{sectionDate.toLocaleString('default', { month: 'long' })}</Text>
          <Text opacity={0.5}>{sectionDate.getFullYear()}</Text>
        </HStack>
      );
      stepperData.push({
        title: sectionTitle,
        titleProps: {
          fontSize: 'xs',
          fontWeight: 'bold'
        },
        items: []
      });
      let lastDay = -1; // Used to cache the latest activity's day of the month
      for (const activity of section.activities) {
        const itemDate = new Date(activity.timestamp);
        // Only show the date if it differs from the previous activity
        const showDate = lastDay !== itemDate.getDate();
        lastDay = itemDate.getDate();
        const activityTitle = (
          <LinkBox
            as={HStack}
            _hover={{
              'p, a': {
                color: 'components.userActivity.item.title._hover.color'
              }
            }}
          >
            <LinkOverlay as={Link} href={activity.title.href}>
              {activity.title.name}
            </LinkOverlay>
            {showDate && (
              <>
                <Spacer />
                <Text
                  display={{ base: 'none', md: 'initial' }}
                  fontSize="xs"
                  color="components.userActivity.item.title.date.color"
                >
                  {`${itemDate.toLocaleString('default', {
                    month: 'short'
                  })} ${itemDate.toLocaleDateString('default', {
                    day: '2-digit'
                  })}`}
                </Text>
              </>
            )}
          </LinkBox>
        );

        stepperData[stepperData.length - 1].items.push({
          title: activityTitle,
          icon: activityIcons[activity.type]
        });

        visibileActivities++;
      }
    }
    return stepperData;
  }, [activity]);

  const handleFetchMore = async () => {
    if (!fetchMore || isFetching) return;
    setIsFetching(true);
    await fetchMore();
    setIsFetching(false);
  };

  if (!activity || !stepperData) {
    return (
      <Box w="full" {...props}>
        <ActivityListSkeleton />
      </Box>
    );
  }

  return (
    <Box textAlign="left" w="full" {...props}>
      <Heading size="md" {...activityListStyling.title}>
        Activity
      </Heading>
      <Stepper sections={stepperData} />
      {activity.hasMore && (
        <Center mt={5}>
          <Button
            variant="ghost-hover-outline"
            size="sm"
            borderRadius="lg"
            onClick={handleFetchMore}
            isDisabled={isFetching}
          >
            Show more
          </Button>
        </Center>
      )}
    </Box>
  );
};

export default ActivityList;
