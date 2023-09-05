import { VStack, SimpleGrid, Divider } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';
import { TPostListData, TPostPreview } from '../../../post/types/post';
import PostPreview from '../../../post/preview/components/PostCardPreview';
import ActivityList from '../../activity/components/ActivityList';
import PostList from '../../../post/PostList';
import { TActivitySection } from '../../activity/types/activity';

interface IProfileOverviewProps {
  posts: TPostListData;
  setPosts: (data: TPostListData) => void;
  activity?: TActivitySection[];
}

/**
 * Component for displaying a user's profile overview.
 */
const ProfileOverview: FC<IProfileOverviewProps> = ({
  posts,
  setPosts,
  activity
}) => {
  //TODO: implement toggleLike with API call
  const toggleLike = (id: TPostPreview['id']) => {
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
