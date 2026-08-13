import { Privacy, PrivacyInput } from '@/clients/social/src/schema.generated';
import {
  Button,
  Collapsible,
  Group,
  HStack,
  IconButton,
  Input,
  InputAddon,
  List,
  Stack
} from '@chakra-ui/react';
import { Link } from 'gatsby-plugin-jaen';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import PostCardSkeleton from './PostCardSkeleton';
import PostCard from './PostCard';
import { useLazyQuery, useQuery } from 'snek-query/react-hooks';
import { sq } from '@/clients/social';
import TbFilterDown from '../icons/tabler/TbFilterDown';
import TbFilterUp from '../icons/tabler/TbFilterUp';
import TbPlus from '../icons/tabler/TbPlus';
import { useAuth } from 'jaen';
import { asEnumKey } from 'snek-query';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/chakra';

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
    <Stack w="full">
      <HStack gap="3" w="full">
        {/* `onValueChange` is not an Input prop — the codemod renamed the
            handler and the field stopped updating. v3's Input is still a plain
            controlled <input> with `onChange`.

            `focusBorderColor` is gone with no rename. v3 paints the focus ring
            from `--focus-ring-color`, which `focusRingColor` sets, so this is
            the same theme.600 v2 put on the border and the ring. */}
        <Input
          flex="1"
          placeholder="Find a experiment..."
          size="sm"
          borderRadius="lg"
          focusRingColor="theme.600"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <IconButton
          colorPalette="gray"
          size="sm"
          variant="outline"
          aria-label={'Toggle advanced search filter visibility'}
          onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
        >
          {isAdvancedSearchOpen ? <TbFilterDown /> : <TbFilterUp />}
        </IconButton>

        {isAuthenticated && (
          <Button aria-label="New experiment" size="sm" asChild>
            <Link href="/new/experiment">
              <TbPlus />
              New
            </Link>
          </Button>
        )}
      </HStack>

      <Collapsible.Root open={isAdvancedSearchOpen} style={{ width: '75%' }}>
        <Collapsible.Content>
          <HStack gap={5} w="full">
            {!!setDateRange && (
              // v3's InputGroup clones a SINGLE child (React.Children.only), so
              // it cannot hold two addons and two inputs the way v2's did — it
              // throws. `Group attached` is the part that does what this markup
              // used v2's InputGroup for: it squares off the inner corners and
              // pulls the borders together with the same -1px, which is exactly
              // the border radii v2's InputGroup cloned onto its children.
              // v2's InputGroup also pushed its `size` down to every child;
              // Group does not, so each child names its own.
              <Group attached w="full">
                <InputAddon size="sm" borderLeftRadius="lg">
                  Date from
                </InputAddon>
                <Input
                  ref={dateFromRef}
                  size="sm"
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
                <InputAddon size="sm">Date to</InputAddon>
                <Input
                  ref={dateToRef}
                  size="sm"
                  type="date"
                  css={{
                    borderRightRadius: 'lg'
                  }}
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
              </Group>
            )}
          </HStack>
        </Collapsible.Content>
      </Collapsible.Root>

      {/* v2's <List> was a bare <ul> with `listStyleType: none` and no indent,
          and it spaced its children with a sibling margin. v3's List.Root
          defaults to `variant="marker"`, whose `listStyle: revert` puts the
          browser's bullets back, and this site's list recipe gives the root
          `display: block` and a 1em indent for the MDX lists it was written
          for. `plain` drops the bullets, and the three layout props restore the
          box `gap` needs — none of which the cards had in v2. */}
      <List.Root
        variant="plain"
        display="flex"
        flexDirection="column"
        ms="0"
        gap={3}
        mt="4"
      >
        {allPosts.nodes.map((post, idx) => (
          <PostCard
            key={idx}
            post={post}
            hideAuthor={props.hideAuthor}
            isSafe={isSafe}
            onDelete={handlePostDelete}
            onSetPrivacy={handlePostPrivacy}
          />
        ))}
      </List.Root>

      <HStack justifyContent="center">
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          disabled={!hasPreviousPage}
          onClick={previousPage}
        >
          <ChevronLeftIcon />
          Previous
        </Button>
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          disabled={!hasNextPage}
          onClick={nextPage}
        >
          Next
          <ChevronRightIcon />
        </Button>
      </HStack>
    </Stack>
  );
};

export default PostList;
