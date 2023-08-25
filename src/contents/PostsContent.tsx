import { Box, Heading, VStack, keyframes } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import MainGrid from '../shared/containers/components/MainGrid';
import { useMenuContext } from '../shared/contexts/menu';
import PostList from '../features/post/PostList';
import { TPostListData } from '../features/post/types/post';
import PostListControls from '../features/post/PostListControls';
import LeftNav from '../shared/containers/navigation/LeftNav';
import PageDirectory from '../shared/containers/navigation/components/PageDirectory';
import { posts } from '../shared/utils/features/post';

const gradientAnimation = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`;

/**
 * Content for the posts page.
 * This is the main page for discovering and searching posts.
 */
const PostsContent: FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { menuStructure } = useMenuContext();
  const [featuredPosts, setFeaturedPosts] = useState<TPostListData>({
    state: 'loading',
    posts: []
  });
  const [latestPosts, setLatestPosts] = useState<TPostListData>({
    state: 'loading',
    posts: []
  });
  const [postResults, setPostResults] = useState<TPostListData>({
    state: 'inactive',
    posts: []
  });

  useEffect(() => {
    // Simulate loading posts from an API
    setTimeout(() => {
      setFeaturedPosts({ posts: posts.slice(0, 4), state: 'success' });
      setLatestPosts({ posts: posts.slice(4), state: 'success' });
    }, 3000);
  }, []);

  return (
    <MainGrid>
      <Box display={{ base: 'none', md: 'block' }} position="sticky">
        <LeftNav isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
          <Box w={isExpanded ? 'auto' : 0}>
            <PageDirectory data={menuStructure} isExpanded={isExpanded} />
          </Box>
        </LeftNav>
      </Box>
      <VStack>
        <PostListControls
          setPosts={setPostResults}
          w={{ base: 'full', md: '75%' }}
          showCreatePostButton
        />
        {postResults.state === 'inactive' ? (
          <>
            <Box
              borderRadius="xl"
              mt={10}
              p={1}
              background="pages.posts.featured.bg"
              background-size="600% 600%"
              animation={`5s ease 0s infinite normal none running ${gradientAnimation}`}
              w="full"
            >
              <Box bgColor="shared.body.bgColor" borderRadius="xl">
                <Box
                  position="absolute"
                  transform="translateY(-50%)"
                  bgColor="shared.body.bgColor"
                  w="fit-content"
                  px={3}
                  ml={5}
                  borderRadius="full"
                >
                  <Heading
                    as="h1"
                    size="lg"
                    color="pages.posts.featured.title.color"
                  >
                    Featured Posts
                  </Heading>
                </Box>
                <PostList
                  postData={featuredPosts}
                  py={10}
                  px={3}
                  previewType="card"
                  itemsPerPage={4}
                  w="full"
                  skeletonProps={{
                    minW: '100%'
                  }}
                />
              </Box>
            </Box>
            <Box py={10} px={3} w="full">
              <Heading as="h2" size="md">
                Latest Posts
              </Heading>
              <PostList
                postData={latestPosts}
                pt={5}
                previewType="list"
                itemsPerPage={10}
                skeletonProps={{
                  w: 'full'
                }}
              />
            </Box>
          </>
        ) : (
          <PostList mt={10} postData={postResults} />
        )}
      </VStack>
    </MainGrid>
  );
};

export default PostsContent;
1;
