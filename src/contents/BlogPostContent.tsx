import { FC, useRef, useState } from 'react';
import PostTopNav from '../features/post/components/PostTopNav';
import { useAppStore } from '../shared/store/store';
import PostLeftNav from '../features/post/components/PostLeftNav';
import MainFlex from '../shared/containers/components/MainFlex';
import PostReader from '../features/post/components/PostReader';
import MainGrid from '../shared/containers/components/MainGrid';
import PostEditor from '../features/post/components/PostEditor';
import PostActionToolbar from '../features/post/components/PostActionToolbar';
import Alert from '../shared/components/alert/Alert';
import { useDisclosure } from '@chakra-ui/react';
import { TPostViewMode } from '../features/post/types/post';
import { useAuthenticationContext } from '@atsnek/jaen';

export interface IBlogPostContentProps {
  slug: string;
}

/**
 * Content for the blog post page (reading and editing).
 */
const BlogPostContent: FC<IBlogPostContentProps> = ({ slug }) => {
  const [viewMode, setViewMode] = useState<TPostViewMode>('read');
  const [isRating, setIsRating] = useState(false);
  const [isUpdatingPrivacy, setIsUpdatingPrivacy] = useState(false);
  const privacyAlertDisclosure = useDisclosure();
  const isAuthenticated = useAuthenticationContext().user !== null;
  const ref = useRef<{ oldPrivacy?: string }>({ oldPrivacy: undefined }); // This allows us to retrieve the old privacy value to keep the same alert styling while optimistically updating the post's privacy

  const author = useAppStore(state => state.singlePost.postAuthor);
  const currentUser = useAppStore(state => state.currentUser.userMe);
  const post = useAppStore(state => state.singlePost.post);
  const togglePostRating = useAppStore(
    state => state.singlePost.togglePostRating
  );
  const togglePostPrivacy = useAppStore(
    state => state.singlePost.togglePrivacy
  );
  const editSummary = useAppStore(state => state.singlePost.editSummary);
  const editTitle = useAppStore(state => state.singlePost.editTitle);
  const updatePreviewImage = useAppStore(
    state => state.singlePost.updatePreviewImage
  );
  const [isPreviewImageUploading, setIsPreviewImageUploading] = useState(false);

  const toggleViewMode = () => {
    setViewMode(viewMode === 'read' ? 'edit' : 'read');
  };

  const setPostPreviewImage = async (src: File) => {
    setIsPreviewImageUploading(true);
    await updatePreviewImage(src);
    setIsPreviewImageUploading(false);
  };

  const handleTogglePrivacy = () => {
    privacyAlertDisclosure.onOpen();
  };

  const togglePrivacy = async () => {
    ref.current.oldPrivacy = post?.privacy ?? 'public';
    setIsUpdatingPrivacy(true);
    await togglePostPrivacy();
    setIsUpdatingPrivacy(false);
    ref.current.oldPrivacy = undefined;
  };

  const handleSummaryChange = (summary: string) => {
    editSummary(summary);
  };

  const handelTitleChange = (title: string) => {
    editTitle(title);
  };

  const handleRatePost = async () => {
    if (isPostAuthor || !isAuthenticated) return;
    setIsRating(true);
    await togglePostRating();
    setIsRating(false);
  };

  const isPostAuthor = currentUser?.id === author?.id;
  const canEditPost = isPostAuthor && viewMode === 'edit';
  const isPostPublic = post?.privacy === 'public';

  const MainWrapper = viewMode === 'read' ? MainGrid : MainFlex;

  return (
    <>
      <PostTopNav
        author={author}
        handleTogglePrivacy={handleTogglePrivacy}
        isUpdatingPrivacy={isUpdatingPrivacy}
        post={post}
        setPostPreviewImage={setPostPreviewImage}
        isAuthor={isPostAuthor}
        canEdit={canEditPost}
        handleRatePost={handleRatePost}
        isRating={isRating}
      />
      <MainWrapper>
        <PostLeftNav
          handleTitleChange={handelTitleChange}
          handleSummaryChange={handleSummaryChange}
          setPostPreviewImage={setPostPreviewImage}
          canEdit={canEditPost}
          post={post}
          isPostPreviewImageUploading={isPreviewImageUploading}
        />
        {canEditPost ? (
          <PostEditor post={post} />
        ) : (
          <PostReader
            isAuthor={isPostAuthor}
            post={post}
            handleRatePost={handleRatePost}
            isRating={isRating}
          />
        )}
      </MainWrapper>
      <PostActionToolbar
        viewMode={viewMode}
        toggleViewMode={toggleViewMode}
        isPublic={isPostPublic}
        canEdit={isPostAuthor}
        setPostPreviewImage={setPostPreviewImage}
        handleTogglePrivacy={handleTogglePrivacy}
        isTogglingPrivacy={isUpdatingPrivacy}
        toggleRating={handleRatePost}
        hasRated={post?.hasRated ?? false}
        isRating={isRating}
      />
      <Alert
        disclosure={privacyAlertDisclosure}
        confirmationAction={togglePrivacy}
        confirmationLabel={isPostPublic ? 'Unpublish' : 'Publish'}
        confirmationProps={{
          variant:
            (ref.current.oldPrivacy ?? post?.privacy) === 'public'
              ? 'filledYellow'
              : 'filledGreen'
        }}
        body={
          isPostPublic
            ? 'Are you sure you want to unpublish this post? This post will be visible to everyone'
            : 'Are you sure you want to publish this post? This post will no longer be visible to everyone'
        }
        header={isPostPublic ? 'Unpublish this post?' : 'Publish this post?'}
      />
    </>
  );
};

export default BlogPostContent;
