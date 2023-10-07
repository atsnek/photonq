import { VStack } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { TPostPreview } from '../../../post/types/post';
import ActivityList from '../../activity/components/ActivityList';
import PostList from '../../../post/PostList';
import { useAppStore } from '../../../../shared/store/store';

interface IProfileOverviewProps {
  isOwnProfile?: boolean;
  togglePostPrivacy: (
    id: TPostPreview['id'],
    privacy: TPostPreview['privacy']
  ) => Promise<boolean>;
}

/**
 * Component for displaying a user's profile overview.
 */
const ProfileOverview: FC<IProfileOverviewProps> = ({
  isOwnProfile,
  togglePostPrivacy
}) => {
  const postData = useAppStore(state => state.profile.overviewPosts);
  const activity = useAppStore(state => state.profile.activity);
  const togglePostRating = useAppStore(state => state.profile.togglePostRating);
  const fetchActivities = useAppStore(state => state.profile.fetchActivity);

  const toggleRating = (id: TPostPreview['id']) => {
    if (isOwnProfile) return;
    togglePostRating(id, 'overview');
  };

  const hasOverviewPosts = useMemo(() => postData.items.length > 0, [postData]);
  return (
    <VStack gap={hasOverviewPosts || postData.state === 'loading' ? 12 : 0}>
      <PostList
        postData={postData}
        previewType="card"
        hidePostAuthor
        showPostPrivacy={isOwnProfile}
        togglePostPrivacy={togglePostPrivacy}
        toggleRating={toggleRating}
        itemsPerPage={6}
        maxItems={6}
      />
      {/* {(hasOverviewPosts || postData.state === 'loading') && <Divider />} */}
      <ActivityList activity={activity} mb={10} fetchMore={fetchActivities} />
    </VStack>
  );
};

export default ProfileOverview;
