import { sq } from '@/clients/social';
import { PageConfig, PageProps } from 'jaen';

import { Box, Heading, SimpleGrid, Stack, VStack } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';
import { useQuery } from 'snek-query/react-hooks';
import PostCard from '../../components/post/PostCard';
import PostCardSkeleton from '../../components/post/PostCardSkeleton';
import PostList from '../../components/post/PostList';
import PostLoadError from '../../components/post/PostLoadError';
import { Privacy, PrivacyInput } from '@/clients/social/src/schema.generated';
import { asEnumKey } from 'snek-query';

export const POST_FETCH_LIMIT = 3;

/**
 * The three steps below used to be an emotion `keyframes` tagged template,
 * imported from @chakra-ui/react. v3 does not re-export `keyframes`, and
 * changing the import would not have helped: the helper only injects its
 * @keyframes rule when the same emotion instance serialises the style that
 * names it, and a v3 style prop goes through Chakra's own engine instead. The
 * name would have been interpolated into the shorthand and the rule would
 * never have existed, so the gradient would simply have stopped moving with
 * nothing to show for it. The rule is registered in the theme as
 * `theme.keyframes['gradient-shift']` and named by that string below.
 */
const GRADIENT_ANIMATION_NAME = 'gradient-shift';

const IndexPage: React.FC<PageProps> = () => {
  const { data, isSafe, refetch, errors, networkError } = useQuery(sq);

  // A failed query still hands back snek-query's placeholder posts, which
  // render as blank cards. See PostLoadError.
  const hasFailed = isSafe && (!!errors?.length || !!networkError);

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
        animation={`5s ease 0s infinite normal none running ${GRADIENT_ANIMATION_NAME}`}
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
            {/* One step smaller on a phone. At `lg` the label and its pill
                ran almost the width of the frame and covered the top edge of
                the gradient border, its top-right corner included. */}
            <Heading as="h1" size={{ base: 'md', md: 'lg' }} color="#1FA2FF">
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

          {hasFailed ? (
            <PostLoadError
              subject="The featured experiments"
              onRetry={refetch}
            />
          ) : (
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
          )}

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
      <Stack py={10} px={3} w="full" gap="4">
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
