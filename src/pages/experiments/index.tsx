import { sq } from '@/clients/social';
import { PageConfig, PageProps } from 'jaen';

import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  VStack,
  keyframes
} from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';
import { useQuery } from 'snek-query/react-hooks';
import PostCard from '../../components/post/PostCard';
import PostCardSkeleton from '../../components/post/PostCardSkeleton';
import PostList from '../../components/post/PostList';
import { Privacy, PrivacyInput } from '@/clients/social/src/schema.generated';
import { asEnumKey } from 'snek-query';

export const POST_FETCH_LIMIT = 3;

const gradientAnimation = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`;

const IndexPage: React.FC<PageProps> = () => {
  const { data, isSafe, refetch } = useQuery(sq);

  const handlePostDelete = async (id: string) => {
    await sq.mutate(m => m.postDelete({ id }));

    refetch();
  };

  const handlePostPrivacy = async (id: string, privacy: Privacy) => {
    await sq.mutate(m =>
      m.postUpdate({
        id,
        values: { privacy: asEnumKey(PrivacyInput, privacy) }
      })
    );

    refetch();
  };

  return (
    <Stack>
      <Box
        borderRadius="xl"
        mt={10}
        p={1}
        background="blueGradient"
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
            <Heading as="h1" size="lg" color="#1FA2FF">
              Featured Experiments
            </Heading>
          </Box>
          {/* 
          <SimpleGrid
            columns={2}
            gap={4}
            p={5}
            w="full"
            display={isLoading ? 'grid' : 'none'}
          >
            <PostCard post={post} hideAuthor />;
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </SimpleGrid> */}

          <SimpleGrid
            columns={{
              base: 1,
              md: 2
            }}
            gap={4}
            px={5}
            py="10"
            w="full"
          >
            {data
              .allTrendingPost({ pagination: { first: 4 } })
              .nodes.map(post => {
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    isSafe={isSafe}
                    onDelete={handlePostDelete}
                    onSetPrivacy={handlePostPrivacy}
                  />
                );
              })}
          </SimpleGrid>

          {/* <PostList
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
            /> */}
        </Box>
      </Box>
      <Stack py={10} px={3} w="full" spacing="4">
        <Heading as="h2" size="md">
          Latest Experiments
        </Heading>

        <PostList />
      </Stack>
    </Stack>
  );
};

export default IndexPage;

export const pageConfig: PageConfig = {
  label: 'Experiments',
  icon: 'FaFlask',
  withoutJaenFrameStickyHeader: true,
  menu: {
    type: 'app',
    order: 200,
    group: 'photonq'
  }
};

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`;

export { Head } from 'jaen';
