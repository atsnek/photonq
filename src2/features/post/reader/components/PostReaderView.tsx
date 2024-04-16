import { FC, useEffect, useMemo, useState } from 'react';
import { MainBreadcrumbPart } from '../../../../shared/types/navigation';
import LeftNavPostReader from './LeftNavPostReader';
import {
  Box,
  HStack,
  IconButton,
  Stack,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import Heading from '../../../main-content/heading/components/Heading';
import RightNavPostReader from './RightNavPostReader';
import MainBreadcrumb from '../../../../shared/containers/navigation/components/MainBreadcrumb';
import UserPreview from '../../../user/avatar/components/UserPreview';
import { TUser } from '../../../user/types/user';
import Link from '../../../../shared/components/Link';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';
// import { posts } from '../../../../shared/utils/features/post';
import { formatNumber } from '../../../../shared/utils/utils';
import MainGrid from '../../../../shared/containers/components/MainGrid';
import TopNav from '../../../../shared/containers/navigation/TopNav';
import { TPost } from '../../types/post';
import { sq } from '@snek-functions/origin';
import useAuth from '../../../../shared/hooks/use-auth';
import { formatPostDate } from '../../../../shared/utils/features/post';
import { useAppStore } from '../../../../shared/store/store';

interface IPostReaderViewProps {
  slug: string;
}

/**
 * Component for reading a post.
 */
const PostReaderView: FC<IPostReaderViewProps> = ({ slug }) => {
  const topNavDisclosure = useDisclosure();
  // const [post, setPost] = useState<TPost>();
  const post = useAppStore(state => state.singlePost.post);
  console.log('showing post for: ', post);
  // const fetchPost = useAppStore(state => state.singlePost.fetchPost);
  const fetchPostAuthor = useAppStore(
    state => state.singlePost.fetchPostAuthor
  );
  const author = useAppStore(state => state.singlePost.postAuthor);
  const isAuthenticated = useAuth();

  const publicationDate = useMemo(
    () => formatPostDate(post?.createdAt),
    [post]
  );

  // useEffect(() => {
  //   fetchPost(slug);
  // }, []);

  useEffect(() => {
    fetchPostAuthor();
  }, [post?.id]);

  const ratePost = () => {
    if (!isAuthenticated || !post) return;
    console.log('rate post');
    sq.lazyMutation;
  };

  console.log('received post: ', post);

  const authorProfilePath = `/user/${author?.username ?? ''}`;
  const breadcrumbParts: MainBreadcrumbPart[] = [
    {
      name: author?.username ?? '',
      href: authorProfilePath,
      isUser: true,
      user: author,
      showUserImage: true
    },
    {
      name: 'Experiments',
      href: `${authorProfilePath}#experiments`
    },
    {
      name: post?.title ?? '',
      href: '#'
    }
  ];

  return (
    <>
      <MainGrid>
        <LeftNavPostReader post={post} />
        <Stack spacing={{ base: 0, xl: 12 }} direction="row" mb={10}>
          <Box maxW="900px" w="full">
            <MainBreadcrumb parts={breadcrumbParts} />
            <Text fontSize="sm" color="gray.500">
              {publicationDate}
            </Text>
            <Heading variant="h1" mt={0} mb={10}>
              {post?.title}
              {isAuthenticated && (
                <IconButton
                  icon={<TbStar />}
                  aria-label="Rate post"
                  variant="ghost-hover-opacity"
                  _hover={{
                    opacity: 1,
                    transform: 'scale(1.3)',
                    color: 'features.rating._hover.color'
                  }}
                />
              )}
            </Heading>
            <VStack spacing={3} alignItems="start">
              {post?.content ??
                'This is a temporary client-only dev placeholder while the post has no content'}
            </VStack>
          </Box>
          <RightNavPostReader />
        </Stack>
      </MainGrid>
    </>
  );
};

export default PostReaderView;
