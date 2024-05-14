import { Post, Query } from '@/clients/social/src/schema.generated';
import {
  Button,
  Collapse,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  List,
  ListItem,
  Select,
  Stack
} from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
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

  const dateFromRef = useRef<HTMLInputElement>(null);
  const dateToRef = useRef<HTMLInputElement>(null);

  const [dateRange, setDateRange] = useState<
    | {
        from?: Date;
        to?: Date;
      }
    | undefined
  >(undefined);

  const [query, setQuery] = useState('');

  useEffect(() => {
    refetch();
  }, [query, props.userId, dateRange]);

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

  const createdAt: {
    gte?: string;
    lte?: string;
  } = {};

  if (dateRange?.from) {
    createdAt['gte'] = dateRange.from.toISOString();
  }
  if (dateRange?.to) {
    createdAt['lte'] = dateRange.to.toISOString();
  }

  const allPosts = data.allPost({
    where:
      props.useStars && props.userId
        ? {
            stars: { some: { userId: props.userId } },
            createdAt: createdAt
          }
        : props.userId
        ? {
            userId: props.userId,
            createdAt: createdAt
          }
        : {
            createdAt: createdAt
          },
    query,
    pagination: {
      first: paginationCursor.before ? undefined : 6,
      last: paginationCursor.before ? 6 : undefined,
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

      <Collapse
        in={isAdvancedSearchOpen}
        animateOpacity
        style={{ width: '75%' }}
      >
        <HStack gap={5} w="full">
          {!!setDateRange && (
            <InputGroup size="sm">
              <InputLeftAddon borderLeftRadius="lg">Date from</InputLeftAddon>
              <Input
                ref={dateFromRef}
                type="date"
                onChange={e => {
                  const date = e.currentTarget.valueAsDate;

                  if (!date) {
                    setDateRange({
                      ...dateRange,
                      from: undefined
                    });
                  } else {
                    setDateRange({
                      ...dateRange,
                      from: isNaN(date.getTime()) ? undefined : date
                    });
                  }
                }}
              />
              <InputRightAddon>Date to</InputRightAddon>
              <Input
                ref={dateToRef}
                type="date"
                sx={{ borderRightRadius: 'lg' }}
                onChange={e => {
                  const date = e.currentTarget.valueAsDate;

                  if (!date) {
                    setDateRange({
                      ...dateRange,
                      to: undefined
                    });
                  } else {
                    date.setHours(23);
                    date.setMinutes(59);
                    date.setSeconds(59);
                    date.setMilliseconds(999);

                    setDateRange({
                      ...dateRange,
                      to: isNaN(date.getTime()) ? undefined : date
                    });
                  }
                }}
              />
            </InputGroup>
          )}
        </HStack>
      </Collapse>

      <List spacing={3} mt="4">
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
