import { Box, Heading, VStack, keyframes, Container } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import PostList from '../features/post/PostList';
import { EnPostLanguage, TPostPreview } from '../features/post/types/post';
import PostListControls from '../features/post/PostListControls';
import { useAppStore } from '../shared/store/store';

export const POST_FETCH_LIMIT = 3;

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
  const featuredPosts = useAppStore(state => state.communityPosts.featuredPosts);
  const fetchFeaturedPosts = useAppStore(state => state.communityPosts.fetchFeaturedPosts);
  const latestPosts = useAppStore(state => state.communityPosts.latestPosts);
  const fetchLatestPosts = useAppStore(state => state.communityPosts.fetchLatestPosts);
  const togglePostRating = useAppStore(state => state.communityPosts.togglePostRating);
  const togglePostPrivacy = useAppStore(state => state.communityPosts.togglePostPrivacy);

  const deletePost = useAppStore(state => state.communityPosts.deletePost);

  const searchPosts = useAppStore(state => state.communityPosts.searchPosts);
  const fetchSearchPosts = useAppStore(state => state.communityPosts.fetchSearchPosts);

  const filterLanguage = useAppStore(state => state.communityPosts.postLanguage);
  const setFilterLanguage = useAppStore(state => state.communityPosts.setPostLanguage);

  const filterDateRange = useAppStore(state => state.communityPosts.dateRange);
  const setFilterDateRange = useAppStore(state => state.communityPosts.setDateRange);

  useEffect(() => {
    fetchFeaturedPosts();
    fetchLatestPosts(false, true); // Reload latest posts
  }, [filterLanguage]);

  const toggleRating = async (id: TPostPreview['id']) => {
    return await togglePostRating(id);
  };

  return (
    <Container maxW="7xl">
      <VStack>
        <PostListControls
          filterLanguage={filterLanguage}
          setFilterLanguage={setFilterLanguage}
          // setPosts={setPostResults}
          fetchPosts={(query, offset, lang) =>
            fetchSearchPosts(query, POST_FETCH_LIMIT, 0, lang ?? undefined)
          }
          setDateRange={setFilterDateRange}
          showCreatePostButton
          query={searchPosts.query}
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
                  <Heading as="h1" size="lg" color="pages.posts.featured.title.color">
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
                  togglePostPrivacy={togglePostPrivacy}
                  deletePost={deletePost}
                />
              </Box>
            </Box>
            <Box py={10} px={3} w="full">
              <Heading as="h2" size="md">
                Latest Posts
              </Heading>
              <PostList
                fetchNextPagePosts={fetchLatestPosts}
                postData={latestPosts}
                pt={5}
                previewType="list"
                itemsPerPage={latestPosts.itemsPerPage}
                maxItems={latestPosts.hasMore ?? false ? undefined : latestPosts.totalCount}
                skeletonProps={{
                  w: 'full'
                }}
                toggleRating={toggleRating}
                togglePostPrivacy={togglePostPrivacy}
                paginationType="async-pages"
                deletePost={deletePost}
              />
            </Box>
          </>
        ) : (
          <PostList
            mt={10}
            fetchPosts={(query, offset, lang) => {
              fetchSearchPosts(searchPosts.query, POST_FETCH_LIMIT, searchPosts.items.length);
            }}
            postData={searchPosts}
            toggleRating={toggleRating}
            togglePostPrivacy={togglePostPrivacy}
            paginationType="load-more"
            deletePost={deletePost}
          />
        )}
      </VStack>
    </Container>
  );
};

export default PostsContent;
