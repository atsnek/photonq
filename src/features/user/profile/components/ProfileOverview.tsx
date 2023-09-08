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
  const posts = useAppStore(state => state.overviewPosts);
  const activity = useAppStore(state => state.activity);
  //TODO: implement toggleLike with API call
  const toggleLike = (id: TPostPreview['id']) => {
    if (isOwnProfile) return;
    // sq.mutate;
    console.log('toggle like for post ', id);
  };

  return (
    <VStack gap={12}>
      <PostList
        postData={posts}
        previewType="card"
        hidePostAuthor
        itemsPerPage={6}
      />
      <Divider />
      <ActivityList activity={activity} mb={10} />
    </VStack>
  );
};

export default ProfileOverview;
