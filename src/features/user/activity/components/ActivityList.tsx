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
import { FC, ReactNode, useEffect, useState } from 'react';
import { TActivitySection, TActivityType } from '../types/activity';
import { TStepperSection } from '../../../../shared/components/stepper/types/stepper';
import Stepper from '../../../../shared/components/stepper/Stepper';
import TbPencil from '../../../../shared/components/icons/tabler/TbPencil';
import TbMessagesCircle2 from '../../../../shared/components/icons/tabler/TbMessagesCircle2';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';
import Link from '../../../../shared/components/Link';
import usePagination from '../../../../shared/hooks/use-pagination';
import ActivityListSkeleton from './ActivityListSkeleton';

export const activityListStyling = {
  title: {
    mb: 5
  }
};

const activityIcons: Record<TActivityType, ReactNode> = {
  commented: <TbMessagesCircle2 />,
  published: <TbPencil />,
  rated: <TbStar />
};

interface IActivityListProps extends BoxProps {
  activity?: TActivitySection[];
}

/**
 * Component for displaying a list of activities.
 */
const ActivityList: FC<IActivityListProps> = ({ activity, ...props }) => {
  // const [activity, setActivity] = useState<TActivitySection[]>();
  const pagination = usePagination({
    itemsPerPage: 3,
    totalItems: activity?.length ?? 0
  });

  const stepperData: TStepperSection[] | undefined = activity?.map(section => {
    const sectionDate = new Date(section.timestamp);
    const sectionTitle = (
      <HStack spacing={1}>
        <Text>{sectionDate.toLocaleString('default', { month: 'long' })}</Text>
        <Text opacity={0.5}>{sectionDate.getFullYear()}</Text>
      </HStack>
    );
    let lastDay = -1; // Used to cache the latest activity's day of the month
    return {
      title: sectionTitle,
      titleProps: {
        fontSize: 'xs',
        fontWeight: 'bold'
      },
      items: section.activities.map(({ title, type, timestamp }) => {
        const itemDate = new Date(timestamp);
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
            <LinkOverlay as={Link} href={title.href}>
              {title.name}
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

        return {
          title: activityTitle,
          icon: activityIcons[type]
        };
      })
    };
  });

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
      <Stepper
        sections={stepperData.slice(
          0,
          pagination.currentPage * pagination.itemsPerPage
        )}
      />
      <Center mt={5}>
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          display={
            pagination.currentPage === pagination.totalPages ? 'none' : ''
          }
          onClick={pagination.nextPage}
        >
          Show more
        </Button>
      </Center>
    </Box>
  );
};

export default ActivityList;
