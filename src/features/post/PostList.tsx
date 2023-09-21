import { FC, ReactElement, ReactNode, useMemo } from 'react';
import {
  IPostPreviewProps,
  TPaginatedPostListData,
  TPostListData,
  TPostPreview
} from './types/post';
import {
  Button,
  CardProps,
  HStack,
  LinkBoxProps,
  SimpleGrid,
  StackProps,
  VStack
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import PostCardPreview from './preview/components/PostCardPreview';
import usePagination, {
  TPaginationType
} from '../../shared/hooks/use-pagination';
import PostListControls from './PostListControls';
import PostCardPreviewSkeleton from './preview/components/PostCardPreviewSkeleton';
import PostListItemPreview from './preview/components/PostListItemPreview';
import PostListItemPreviewSkeleton from './preview/components/PostListItemPreviewSkeleton';
import PostListNoResults from './preview/components/PostListNoResults';
import { query } from '../../pages';

interface IPostListProps extends StackProps {
  fetchPosts?: (query: string, offset: number) => void;
  postData: TPaginatedPostListData;
  itemsPerPage?: number;
  maxItems?: number;
  paginationType?: TPaginationType;
  showControls?: boolean;
  hidePostAuthor?: boolean;
  previewType?: 'card' | 'list';
  skeletonProps?: CardProps & LinkBoxProps;
  defaultFilterQuery?: string;
  currentQuery?: string;
  setFilterQuery?: (query: string) => void;
  showNoListResult?: boolean;
  showPostPrivacy?: boolean;
  toggleRating: (id: TPostPreview['id']) => void;
}

/**
 * Component for displaying a sort- and filterable list of posts.
 */
const PostList: FC<IPostListProps> = ({
  fetchPosts,
  postData,
  itemsPerPage = 10,
  maxItems = itemsPerPage,
  paginationType = 'pages',
  showControls,
  hidePostAuthor,
  previewType = 'list',
  skeletonProps,
  defaultFilterQuery,
  currentQuery,
  setFilterQuery,
  showNoListResult = true,
  showPostPrivacy,
  toggleRating,
  ...props
}) => {
  const usePages = paginationType === 'pages';
  const pagination = usePagination({
    items: postData.items,
    itemsPerPage: itemsPerPage,
    maxItems: usePages ? maxItems : undefined,
    type: paginationType
  });

  const memoizedPostPreviews = useMemo(() => {
    let PreviewComp: typeof PostCardPreview | typeof PostListItemPreview;
    let PreviewSkeletonComp:
      | typeof PostCardPreviewSkeleton
      | typeof PostListItemPreviewSkeleton;
    type ExtractProps<T> = T extends FC<IPostPreviewProps<infer P>> ? P : never;
    let previewCompProps:
      | ExtractProps<typeof PostCardPreview>
      | ExtractProps<typeof PostListItemPreview> = {};

    if (previewType === 'card') {
      PreviewComp = PostCardPreview;
      PreviewSkeletonComp = PostCardPreviewSkeleton;
    } else {
      PreviewComp = PostListItemPreview;
      PreviewSkeletonComp = PostListItemPreviewSkeleton;
    }

    let previewSkeletons: ReactElement[] = [];
    if (postData.state === 'loading') {
      previewSkeletons = Array.from({ length: pagination.itemsPerPage }).map(
        (_, i) => (
          <PreviewSkeletonComp
            key={i}
            {...skeletonProps}
            hideAuthor={hidePostAuthor}
          />
        )
      );
    }

    const postPreviews = pagination.currentItems.map(postPreview => (
      <PreviewComp
        key={postPreview.id}
        toggleRating={toggleRating}
        {...postPreview}
        {...previewCompProps}
        hideAuthor={hidePostAuthor}
        showPrivacy={showPostPrivacy}
        wrapperProps={{ minW: '33%' }}
      />
    ));
    return [...postPreviews, ...previewSkeletons];
  }, [postData, pagination]);

  let postPreviews: ReactNode;
  if (memoizedPostPreviews.length > 0) {
    if (previewType === 'card') {
      // Shows the posts in a grid of cards
      postPreviews = (
        <SimpleGrid w="full" spacing={5} columns={{ base: 1, sm: 2 }}>
          {memoizedPostPreviews}
        </SimpleGrid>
      );
    } else {
      // Shows the posts in a list
      postPreviews = (
        <VStack w="full" spacing={5}>
          {memoizedPostPreviews}
        </VStack>
      );
    }
  }

  const handleFetchPosts = (query: string) => {
    if (query.length === 0) pagination.setCurrentPage(1);
    if (fetchPosts) fetchPosts(query, 0);
  };

  return (
    <VStack w="full" gap={5} {...props}>
      {showControls && fetchPosts && (
        <PostListControls
          fetchPosts={handleFetchPosts}
          defaultQuery={defaultFilterQuery}
          setQuery={setFilterQuery}
        />
      )}
      {postData.state !== 'inactive' &&
        (postPreviews || showNoListResult ? (
          postPreviews
        ) : (
          <PostListNoResults mt={10} />
        ))}
      {usePages &&
        pagination.totalPages > 1 &&
        (maxItems === undefined || itemsPerPage < maxItems) && (
          <HStack alignContent="space-around">
            <Button
              variant="ghost-hover-outline"
              size="sm"
              borderRadius="lg"
              leftIcon={<ChevronLeftIcon />}
              isDisabled={pagination.currentPage === 1}
              onClick={pagination.previousPage}
            >
              Previous
            </Button>
            <Button
              variant="ghost-hover-outline"
              size="sm"
              borderRadius="lg"
              rightIcon={<ChevronRightIcon />}
              isDisabled={pagination.currentPage === pagination.totalPages}
              onClick={pagination.nextPage}
            >
              Next
            </Button>
          </HStack>
        )}
      {!usePages && postData.state !== 'inactive' && postData.hasMore && (
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          rightIcon={<ChevronRightIcon />}
          isDisabled={postData.state === 'loading'}
          onClick={
            !!fetchPosts
              ? () => {
                  fetchPosts(
                    currentQuery ?? defaultFilterQuery ?? '',
                    pagination.currentItems.length
                  );
                }
              : undefined
          }
        >
          Load more
        </Button>
      )}
    </VStack>
  );
};

export default PostList;
