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

  const postPreviews: TPostPreview[] = [
    {
      id: '1',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: '#'
    },
    {
      id: '2',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: '#',
      canManage: true
    },
    {
      id: '3',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      url: '#',
      canManage: true
    },
    {
      id: '4',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 1423,
      hasLiked: true,
      url: '#',
      canManage: false
    },
    {
      id: '5',
      publicationDate: '2023-16-15',
      author: 'Emily Brooks',
      title: 'Unlocking the Power of Quantum Computing',
      summary:
        'Quantum computing is a rapidly developing field that has the potential to revolutionize the way we solve complex problems.',
      likes: 500,
      url: '#',
      canManage: true
    }
  ];

  useEffect(() => {
    // This temporarily simulates a loading state
    setTimeout(() => {
      setPosts({
        state: 'success',
        posts: postPreviews
      });
    }, 3000);
  }, []);

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
