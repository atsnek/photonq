import { Post, Query } from '@/clients/social/src/schema.generated';
import {
  Button,
  HStack,
  IconButton,
  Input,
  List,
  ListItem,
  Stack
} from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';
import { FC, useEffect, useMemo, useState } from 'react';
import PostCardSkeleton from './PostCardSkeleton';
import PostCard from './PostCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useLazyQuery, useQuery } from 'snek-query/react-hooks';
import { sq } from '@/clients/social';
import TbFilterDown from '../icons/tabler/TbFilterDown';
import TbFilterUp from '../icons/tabler/TbFilterUp';
import TbPlus from '../icons/tabler/TbPlus';
import { useAuth } from '@atsnek/jaen';

interface PostListProps {
  userId?: string;
  useStars?: boolean;
  hideAuthor?: boolean;
}

const PostList: FC<PostListProps> = props => {
  const { isAuthenticated } = useAuth();

  const [_, { data, refetch, isSafe }] = useLazyQuery(sq);

  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

  const [query, setQuery] = useState('');

  useEffect(() => {
    refetch();
  }, [query, props.userId]);

  const [paginationCursor, setPaginationCursor] = useState<{
    before: string | undefined;
    after: string | undefined;
  }>({
    before: undefined,
    after: undefined
  });

  useEffect(() => {
    if (paginationCursor.after || paginationCursor.before) {
      refetch();
    }
  }, [paginationCursor]);

  const allPosts = data.allPost({
    where:
      props.useStars && props.userId
        ? { stars: { some: { userId: props.userId } } }
        : props.userId
        ? { userId: props.userId }
        : undefined,
    query,
    pagination: {
      first: paginationCursor.before ? undefined : 1,
      last: paginationCursor.before ? 1 : undefined,
      after: paginationCursor.after,
      before: paginationCursor.before
    }
  });

  const { hasNextPage, hasPreviousPage, startCursor, endCursor } =
    useMemo(() => {
      return {
        hasNextPage: allPosts.pageInfo.hasNextPage,
        hasPreviousPage: allPosts.pageInfo.hasPreviousPage,
        endCursor: allPosts.pageInfo.endCursor || undefined,
        startCursor: allPosts.pageInfo.startCursor || undefined
      };
    }, [allPosts]);

  const nextPage = () => {
    if (hasNextPage) {
      setPaginationCursor({
        after: endCursor,
        before: undefined
      });
    }
  };

  const previousPage = () => {
    if (hasPreviousPage) {
      setPaginationCursor({
        after: undefined,
        before: startCursor
      });
    }
  };

  return (
    <Stack w="full">
      <HStack spacing="3" w="full">
        <Input
          flex="1"
          placeholder="Find a experiment..."
          size="sm"
          borderRadius="lg"
          focusBorderColor="theme.600"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <IconButton
          colorScheme="gray"
          size="sm"
          variant="outline"
          icon={isAdvancedSearchOpen ? <TbFilterDown /> : <TbFilterUp />}
          aria-label={'Toggle advanced search filter visibility'}
          onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
        />

        {isAuthenticated && (
          <Button
            aria-label="New experiment"
            as={Link}
            href="/new/experiment"
            size="sm"
            leftIcon={<TbPlus />}
          >
            New
          </Button>
        )}
      </HStack>

      <List spacing={3}>
        {allPosts.nodes.map((post, idx) => (
          <PostCard
            key={idx}
            post={post}
            hideAuthor={props.hideAuthor}
            isSafe={isSafe}
          />
        ))}
      </List>

      <HStack justifyContent="center">
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          leftIcon={<ChevronLeftIcon />}
          isDisabled={!hasPreviousPage}
          onClick={previousPage}
        >
          Previous
        </Button>
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          rightIcon={<ChevronRightIcon />}
          isDisabled={!hasNextPage}
          onClick={nextPage}
        >
          Next
        </Button>
      </HStack>
    </Stack>
  );
};

export default PostList;
