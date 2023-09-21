import { VStack } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { TPostPreview } from '../../../post/types/post';
import ActivityList from '../../activity/components/ActivityList';
import PostList from '../../../post/PostList';
import { useAppStore } from '../../../../shared/store/store';

interface IProfileOverviewProps {
  isOwnProfile?: boolean;
}

/**
 * Component for displaying a user's profile overview.
 */
const ProfileOverview: FC<IProfileOverviewProps> = ({ isOwnProfile }) => {
  const postData = useAppStore(state => state.profile.overviewPosts);
  const activity = useAppStore(state => state.profile.activity);
  const togglePostRating = useAppStore(state => state.profile.togglePostRating);
  //TODO: implement toggleLike with API call
  const toggleRating = (id: TPostPreview['id']) => {
    if (isOwnProfile) return;
    togglePostRating(id, 'overview');
  };

  const hasOverviewPosts = useMemo(() => postData.posts.length > 0, [postData]);
  return (
    <VStack gap={hasOverviewPosts || postData.state === 'loading' ? 12 : 0}>
      <PostList
        postData={postData}
        previewType="card"
        hidePostAuthor
        showPostPrivacy={isOwnProfile}
        toggleRating={toggleRating}
        itemsPerPage={6}
        maxItems={6}
      />
      {/* {(hasOverviewPosts || postData.state === 'loading') && <Divider />} */}
      <ActivityList activity={activity} mb={10} />
    </VStack>
  );
};

export default ProfileOverview;
