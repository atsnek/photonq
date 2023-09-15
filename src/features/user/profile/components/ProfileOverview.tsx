import { VStack, SimpleGrid, Divider } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';
import { TPostListData, TPostPreview } from '../../../post/types/post';
import PostPreview from '../../../post/preview/components/PostCardPreview';
import ActivityList from '../../activity/components/ActivityList';
import PostList from '../../../post/PostList';
import { TActivitySection } from '../../activity/types/activity';
import { sq } from '@snek-functions/origin';
import { useAuthenticationContext } from '@atsnek/jaen';
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
  //TODO: implement toggleLike with API call
  const toggleRating = (id: TPostPreview['id']) => {
    if (isOwnProfile) return;
    // sq.mutate;
    console.log('toggle like for post ', id);
  };

  const hasOverviewPosts = useMemo(() => postData.posts.length > 0, [postData]);
  console.log('visiting own profile: ', isOwnProfile);

  return (
    <VStack gap={hasOverviewPosts ? 12 : 0}>
      <PostList
        postData={postData}
        previewType="card"
        hidePostAuthor
        showPostPrivacy={isOwnProfile}
        toggleRating={toggleRating}
        itemsPerPage={6}
        maxItems={6}
      />
      {hasOverviewPosts && <Divider />}
      <ActivityList activity={activity} mb={10} />
    </VStack>
  );
};

export default ProfileOverview;
