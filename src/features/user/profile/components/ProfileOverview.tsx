import { Box, Divider, Heading, VStack } from '@chakra-ui/react';
import { FC, useEffect, useMemo } from 'react';
import { TPostPreview } from '../../../post/types/post';
import ActivityList from '../../activity/components/ActivityList';
import PostList from '../../../post/PostList';
import { useAppStore } from '../../../../shared/store/store';
import { TAsyncListData } from '../../../../shared/types/list';

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
  const showcaseStarPosts = useAppStore(
    state => state.profile.showcaseStarsPosts
  );
  const fetchShowcaseStarPosts = useAppStore(
    state => state.profile.fetchShowcaseStarsPosts
  );
  const showcaseLatestPosts = useAppStore(
    state => state.profile.showcaseLatestPosts
  );
  const fetchShowcaseLatestPosts = useAppStore(
    state => state.profile.fetchShowcaseLatestPosts
  );
  const deletePost = useAppStore(state => state.profile.deletePost);

  useEffect(() => {
    if (
      showcaseStarPosts.items.length === 0 &&
      showcaseStarPosts.state === 'inactive'
    ) {
      fetchShowcaseStarPosts();
    }
    if (
      showcaseLatestPosts.items.length === 0 &&
      showcaseLatestPosts.state === 'inactive'
    ) {
      fetchShowcaseLatestPosts();
    }
  });

  const toggleRating = (
    id: TPostPreview['id'],
    source: Parameters<typeof togglePostRating>[1]
  ) => {
    if (isOwnProfile) return;
    togglePostRating(id, 'overview');
  };

  const hasOverviewPosts = useMemo(() => postData.items.length > 0, [postData]);
  // const hasShowcasePosts = useMemo(
  //   () => showcaseStarPosts.items.length > 0 || showcaseLatestPosts.items.length > 0,
  //   [showcaseStarPosts, showcaseLatestPosts]
  // );
  return (
    <VStack gap={12}>
      <PostList
        postData={postData}
        previewType="card"
        hidePostAuthor
        isOwnProfile={isOwnProfile}
        togglePostPrivacy={togglePostPrivacy}
        toggleRating={id => toggleRating(id, 'overview')}
        itemsPerPage={6}
        maxItems={6}
        deletePost={deletePost}
      />
      {/* {hasShowcasePosts && <Divider />} */}
      {(showcaseStarPosts.state === 'loading' ||
        showcaseStarPosts.items.length > 0) && (
        <Box w="full">
          <Heading size={'md'} mb={5}>
            Popular Experiments
          </Heading>
          <PostList
            postData={showcaseStarPosts}
            previewType="card"
            hidePostAuthor
            isOwnProfile={isOwnProfile}
            togglePostPrivacy={togglePostPrivacy}
            toggleRating={id => toggleRating(id, 'showcase_stars')}
            itemsPerPage={4}
            maxItems={4}
            deletePost={deletePost}
          />
        </Box>
      )}
      {(showcaseLatestPosts.state === 'loading' ||
        showcaseLatestPosts.items.length > 0) && (
        <Box w="full">
          <Heading size={'md'} mb={5}>
            Latest Experiments
          </Heading>
          <PostList
            postData={showcaseLatestPosts}
            previewType="card"
            hidePostAuthor
            isOwnProfile={isOwnProfile}
            togglePostPrivacy={togglePostPrivacy}
            toggleRating={id => toggleRating(id, 'showcase_latest')}
            itemsPerPage={4}
            maxItems={4}
            deletePost={deletePost}
          />
        </Box>
      )}
      <ActivityList activity={activity} mb={10} fetchMore={fetchActivities} />
    </VStack>
  );
};

export default ProfileOverview;
