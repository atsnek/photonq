import {
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  EnPostLanguage,
  IPostPreviewProps,
  TPaginatedPostListData,
  TPostDateRange,
  TPostPreview
} from './types/post';
import {
  Button,
  CardProps,
  HStack,
  LinkBoxProps,
  SimpleGrid,
  StackProps,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import PostCardPreview from './preview/components/PostCardPreview';
import PostListControls from './PostListControls';
import PostCardPreviewSkeleton from './preview/components/PostCardPreviewSkeleton';
import PostListItemPreview from './preview/components/PostListItemPreview';
import PostListItemPreviewSkeleton from './preview/components/PostListItemPreviewSkeleton';
import PostListNoResults from './preview/components/PostListNoResults';
import { query } from '../../pages';
import { TPaginationType } from '../../shared/types/pagination';
import usePagination from '../../shared/hooks/use-pagination';
import { POST_FETCH_LIMIT } from '../../contents/PostsContent';
import LoadMoreButton from '../../shared/components/pagination/LoadMoreButton';
import { TAsyncListData } from '../../shared/types/list';
import Alert from '../../shared/components/alert/Alert';

interface IPostListProps extends StackProps {
  fetchPosts?: (
    query: string,
    limit: number,
    offset: number,
    language?: EnPostLanguage,
    dateRange?: TPostDateRange
  ) => void;
  fetchNextPagePosts?: () => void;
  postData: TPaginatedPostListData | TAsyncListData<TPostPreview>;
  itemsPerPage?: number;
  maxItems?: number;
  paginationType?: TPaginationType;
  isOwnProfile?: boolean;
  showControls?: boolean;
  hidePostAuthor?: boolean;
  previewType?: 'card' | 'list';
  skeletonProps?: CardProps & LinkBoxProps;
  defaultFilterQuery?: string;
  currentQuery?: string;
  setFilterQuery?: (query: string) => void;
  showNoListResult?: boolean;
  toggleRating: (id: TPostPreview['id']) => void;
  togglePostPrivacy?: (
    id: TPostPreview['id'],
    privacy: TPostPreview['privacy']
  ) => Promise<boolean>;
  deletePost: (id: TPostPreview['id']) => Promise<boolean>;
  filterLanguage?: EnPostLanguage;
  setFilterLanguage?: (language: EnPostLanguage) => void;
  dateRange?: { from: Date | undefined; to: Date | undefined };
  setDateRange?: (
    from: Date | null | undefined,
    to: Date | null | undefined
  ) => void;
}

/**
 * Component for displaying a sort- and filterable list of posts.
 */
const PostList: FC<IPostListProps> = ({
  fetchPosts,
  fetchNextPagePosts,
  postData,
  itemsPerPage = 10,
  maxItems,
  paginationType = 'pages',
  showControls,
  isOwnProfile,
  hidePostAuthor,
  previewType = 'list',
  skeletonProps,
  defaultFilterQuery,
  currentQuery,
  setFilterQuery,
  showNoListResult = true,
  toggleRating,
  togglePostPrivacy,
  deletePost,
  filterLanguage,
  setFilterLanguage,
  dateRange,
  setDateRange,
  ...props
}) => {
  const usePages = paginationType === 'pages';
  const pagination = usePagination({
    items: postData.items,
    itemsPerPage: itemsPerPage,
    maxItems: usePages ? maxItems : undefined,
    type: paginationType,
    hasMoreItems:
      'nextCursor' in postData && (!!postData.nextCursor || postData.hasMore)
  });
  const deletePostDisclosure = useDisclosure();
  const [deletePostId, setDeletePostId] = useState<TPostPreview['id']>();
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const [isTogglingPostPrivacy, setIsTogglingPostPrivacy] = useState(false);

  const handleTogglePostPrivacy = async (
    id: TPostPreview['id'],
    privacy: TPostPreview['privacy']
  ) => {
    if (!togglePostPrivacy) return;
    setIsTogglingPostPrivacy(true);
    await togglePostPrivacy(id, privacy);
    setIsTogglingPostPrivacy(false);
  };

  const handleDeletePost = (id: TPostPreview['id']) => {
    if (isDeletingPost) return;
    setIsDeletingPost(true);
    setDeletePostId(id);
    deletePostDisclosure.onOpen();
  };

  const handleDeletePostConfirmation = async () => {
    deletePostDisclosure.onClose();
    if (!deletePostId) return;
    await deletePost(deletePostId);
    setIsDeletingPost(false);
  };

  const handleDeletePostCancel = () => {
    setDeletePostId(undefined);
    setIsDeletingPost(false);
  };

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

    let postPreviews: JSX.Element[] = [];

    if (paginationType !== 'async-pages' || postData.state !== 'loading') {
      postPreviews = pagination.currentItems.map(postPreview => (
        <PreviewComp
          key={postPreview.id}
          post={postPreview}
          toggleRating={toggleRating}
          togglePostPrivacy={handleTogglePostPrivacy}
          isTogglingPostPrivacy={isTogglingPostPrivacy}
          deletePost={handleDeletePost}
          isDeletingPost={postPreview.id === deletePostId && isDeletingPost}
          {...previewCompProps}
          hideAuthor={hidePostAuthor}
          showPrivacy={isOwnProfile}
          wrapperProps={{ minW: '33%' }}
        />
      ));
    }

    return [...postPreviews, ...previewSkeletons];
  }, [postData, pagination, isTogglingPostPrivacy]);

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

  const handleFetchPosts = (
    query: string,
    offset?: number,
    language?: EnPostLanguage | null
  ) => {
    if (query === currentQuery && postData.state === 'inactive') return; // This prevents the posts from being fetched because only the language has changed wile the feature is inactive
    if (query.length === 0) pagination.setCurrentPage(1);
    if (fetchPosts)
      fetchPosts(
        query,
        POST_FETCH_LIMIT,
        offset ?? 0,
        language === null ? undefined : language ?? filterLanguage
      );
  };

  const handleNextPage = async () => {
    // Only fetch next page if
    // 1. the pagination type is async
    // 2. the pagination type is pages
    // 3. There are more posts to fetch
    // 4. The current page is the last synced page (exlcuding the placeholder last page)
    if (
      fetchNextPagePosts &&
      paginationType === 'async-pages' &&
      'hasMore' in postData &&
      postData.hasMore &&
      pagination.currentPage === pagination.totalPages - 1
    )
      await fetchNextPagePosts();
    pagination.setCurrentPage(pagination.currentPage + 1);
  };

  const handleToggleLanguage = (language: EnPostLanguage) => {
    if (!setFilterLanguage) return;

    pagination.setCurrentPage(1);
    setFilterLanguage(language);
  };

  return (
    <>
      <VStack w="full" gap={5} {...props}>
        {showControls && fetchPosts && (
          <PostListControls
            fetchPosts={handleFetchPosts}
            defaultQuery={defaultFilterQuery}
            query={currentQuery ?? ''}
            setQuery={setFilterQuery}
            filterLanguage={filterLanguage}
            setFilterLanguage={handleToggleLanguage}
            dateRange={dateRange}
            setDateRange={setDateRange}
            showCreatePostButton={!!isOwnProfile}
          />
        )}
        {postData.state !== 'inactive' &&
          (postPreviews || showNoListResult ? (
            postPreviews
          ) : (
            <PostListNoResults mt={10} />
          ))}
        {paginationType === 'pages' ||
          (paginationType === 'async-pages' &&
            (pagination.currentPage > 1 ||
              pagination.currentPage < pagination.totalPages) && (
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
                  isDisabled={
                    'hasMore' in postData &&
                    !postData?.hasMore &&
                    pagination.currentPage === pagination.totalPages
                  }
                  onClick={handleNextPage}
                >
                  Next
                </Button>
              </HStack>
            ))}
        {paginationType === 'load-more' &&
          postData.state !== 'inactive' &&
          'hasMore' in postData &&
          postData.hasMore && (
            <LoadMoreButton
              onClick={
                !!fetchPosts
                  ? () => {
                      fetchPosts(
                        currentQuery ?? defaultFilterQuery ?? '',
                        POST_FETCH_LIMIT,
                        pagination.currentItems.length,
                        filterLanguage
                      );
                    }
                  : undefined
              }
              isDisabled={postData.state === 'loading'}
            />
            // <Button
            //   variant="ghost-hover-outline"
            //   size="sm"
            //   borderRadius="lg"
            //   rightIcon={<ChevronRightIcon />}
            //   isDisabled={postData.state === 'loading'}
            //   onClick={
            //     !!fetchPosts
            //       ? () => {
            //           fetchPosts(
            //             currentQuery ?? defaultFilterQuery ?? '',
            //             POST_FETCH_LIMIT,
            //             pagination.currentItems.length,
            //             filterLanguage
            //           );
            //         }
            //       : undefined
            //   }
            // >
            //   Load more
            // </Button>
          )}
      </VStack>
      <Alert
        disclosure={deletePostDisclosure}
        body="Are you sure you want to delete this experiment? This action cannot be undone!"
        header="Delete this experiment?"
        confirmationAction={handleDeletePostConfirmation}
        confirmationProps={{ variant: 'filledRed' }}
        cancelAction={handleDeletePostCancel}
      />
    </>
  );
};

export default PostList;
