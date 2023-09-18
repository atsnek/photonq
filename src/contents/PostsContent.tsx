import { Box, Heading, VStack, keyframes, Container } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import PostList from '../features/post/PostList';
import { TPostPreview } from '../features/post/types/post';
import PostListControls from '../features/post/PostListControls';
import { useAppStore } from '../shared/store/store';

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
  const featuredPosts = useAppStore(
    state => state.communityPosts.featuredPosts
  );
  const fetchFeaturedPosts = useAppStore(
    state => state.communityPosts.fetchFeaturedPosts
  );
  const latestPosts = useAppStore(state => state.communityPosts.latestPosts);
  const fetchLatestPosts = useAppStore(
    state => state.communityPosts.fetchLatestPosts
  );
  const togglePostRating = useAppStore(
    state => state.communityPosts.togglePostRating
  );

  const searchPosts = useAppStore(state => state.communityPosts.searchPosts);
  const fetchSearchPosts = useAppStore(
    state => state.communityPosts.fetchSearchPosts
  );

  useEffect(() => {
    fetchFeaturedPosts();
    fetchLatestPosts();
  }, []);

  const toggleRating = async (id: TPostPreview['id']) => {
    return await togglePostRating(id);
  };

  return (
    <Container maxW="7xl" mt={10}>
      <VStack>
        <PostListControls
          // setPosts={setPostResults}
          w={{ base: 'full', md: '75%' }}
          fetchPosts={query => fetchSearchPosts(query, 10, 0)}
          showCreatePostButton
        />
        {searchPosts.state === 'inactive' ? (
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
                  toggleRating={toggleRating}
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
                toggleRating={toggleRating}
              />
            </Box>
          </>
        ) : (
          <PostList
            mt={10}
            postData={searchPosts}
            toggleRating={toggleRating}
            paginationType="load-more"
          />
        )}
      </VStack>
    </Container>
  );
};

export default PostsContent;
1;
