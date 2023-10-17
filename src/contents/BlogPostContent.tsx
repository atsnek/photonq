import { FC, useEffect, useState } from 'react';
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
import { EnPostLanguage, TPostViewMode } from '../features/post/types/post';
import { useAuthenticationContext } from '@atsnek/jaen';
import { navigate } from '@reach/router';
import { wait } from '../shared/utils/utils';

const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = '';
  return '';
};

export interface IBlogPostContentProps {
  isNewPost?: boolean;
  slug?: string;
}

/**
 * Content for the blog post page (reading and editing).
 */
const BlogPostContent: FC<IBlogPostContentProps> = ({ isNewPost, slug }) => {
  const [viewMode, setViewMode] = useState<TPostViewMode>(isNewPost ? 'edit' : 'read');
  const [madeChanges, setMadeChanges] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [isUpdatingPrivacy, setIsUpdatingPrivacy] = useState(false);
  const deletePostDisclosure = useDisclosure();
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const isAuthenticated = useAuthenticationContext().user !== null;

  const author = useAppStore(state => state.singlePost.postAuthor);
  const currentUser = useAppStore(state => state.currentUser.userMe);
  const post = useAppStore(state => state.singlePost.post);
  const togglePostRating = useAppStore(state => state.singlePost.togglePostRating);
  const togglePostPrivacy = useAppStore(state => state.singlePost.togglePrivacy);
  const editSummary = useAppStore(state => state.singlePost.editSummary);
  const editTitle = useAppStore(state => state.singlePost.editTitle);
  const updatePreviewImage = useAppStore(state => state.singlePost.updatePreviewImage);
  const changeLanguage = useAppStore(state => state.singlePost.changeLanguage);
  const [isPreviewImageUploading, setIsPreviewImageUploading] = useState(false);
  const createNewPost = useAppStore(state => state.singlePost.createNewPost);
  const savePost = useAppStore(state => state.singlePost.savePost);
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [newPostPreviewImage, setNewPostPreviewImage] = useState<File>();

  const deletePost = useAppStore(state => state.singlePost.deletePost);

  useEffect(() => {
    if (isNewPost) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      if (isNewPost) {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }
    };
  }, []);

  const toggleViewMode = () => {
    setViewMode(viewMode === 'read' ? 'edit' : 'read');
  };

  const setPostPreviewImage = async (src: File) => {
    setIsPreviewImageUploading(true);
    await updatePreviewImage(src);
    setIsPreviewImageUploading(false);
    if (!madeChanges) setMadeChanges(true);
    if (isNewPost) setNewPostPreviewImage(src);
  };

  const handleTogglePrivacy = async () => {
    togglePostPrivacy();
    if (!madeChanges) setMadeChanges(true);
  };

  const handleSummaryChange = async (summary: string) => {
    await editSummary(summary);
    if (!madeChanges) setMadeChanges(true);
  };

  const handleTitleChange = async (title: string) => {
    await editTitle(title);
    if (!madeChanges) setMadeChanges(true);
  };

  const handleRatePost = async () => {
    if (isPostAuthor || !isAuthenticated) return;
    setIsRating(true);
    await togglePostRating();
    setIsRating(false);
  };

  const handleLanguageChange = async (language: EnPostLanguage) => {
    await changeLanguage(language);
    if (!madeChanges) setMadeChanges(true);
  };

  const handleDeletePost = () => {
    deletePostDisclosure.onOpen();
  };

  const handleDeletePostConfirmation = async () => {
    setIsDeletingPost(true);
    const succeed = await deletePost();
    if (succeed) navigate(`/user/${currentUser?.username}`);
    setIsDeletingPost(false);
  };

  const isPostAuthor = isNewPost || (!!currentUser && currentUser?.id === author?.id);
  const canEditPost = isPostAuthor && viewMode === 'edit'; //TODO: Maybe we find a better name for this variable
  const isPostPublic = post?.privacy === 'PUBLIC';

  const MainWrapper = viewMode === 'read' ? MainGrid : MainFlex;

  const handleSavePost = async () => {
    setIsSavingPost(true);
    if (isNewPost) {
      const slug = await createNewPost(newPostPreviewImage);
      if (slug) {
        await wait(500); // Make sure the new post is created before navigating to it
        navigate(`/post/${slug}/`);
      }
      setMadeChanges(false);
      if (slug) window.removeEventListener('beforeunload', handleBeforeUnload);
    } else {
      savePost();
    }
    setIsSavingPost(false);
  };

  return (
    <>
      <PostTopNav
        author={author}
        post={post}
        isAuthor={isPostAuthor}
        handleRatePost={handleRatePost}
        isRating={isRating}
        isSavingPost={isSavingPost}
        mode={viewMode}
        setMode={setViewMode}
        savePost={handleSavePost}
      />
      <MainWrapper>
        <PostLeftNav
          handleTitleChange={handleTitleChange}
          handleSummaryChange={handleSummaryChange}
          setPostPreviewImage={setPostPreviewImage}
          isPostAuthor={isPostAuthor}
          canEdit={canEditPost && !isDeletingPost}
          post={post}
          isPostPreviewImageUploading={isPreviewImageUploading}
          handleLanguageChange={handleLanguageChange}
          handleTogglePrivacy={handleTogglePrivacy}
          isUpdatingPrivacy={isUpdatingPrivacy}
        />
        {canEditPost ? (
          <PostEditor post={post} setIsSavingPost={setIsSavingPost} />
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
        canEdit={isPostAuthor}
        toggleRating={handleRatePost}
        hasRated={post?.hasRated ?? false}
        isRating={isRating}
        handleDeletePost={handleDeletePost}
        isDeletingPost={isDeletingPost}
        savePost={handleSavePost}
        isSavingPost={isSavingPost}
      />
      {/* <Alert
        disclosure={privacyAlertDisclosure}
        confirmationAction={togglePrivacy}
        confirmationLabel={isPostPublic ? 'Unpublish' : 'Publish'}
        confirmationProps={{
          variant:
            (ref.current.oldPrivacy ?? post?.privacy) === 'PUBLIC' ? 'filledYellow' : 'filledGreen'
        }}
        body={
          isPostPublic
            ? 'Are you sure you want to unpublish this post? This post will no longer be visible to everyone.'
            : 'Are you sure you want to publish this post? This post will be visible to everyone.'
        }
        header={isPostPublic ? 'Unpublish this post?' : 'Publish this post?'}
      /> */}
      <Alert
        disclosure={deletePostDisclosure}
        body="Are you sure you want to delete this post? This action cannot be undone."
        header="Delete this post?"
        confirmationAction={handleDeletePostConfirmation}
        confirmationProps={{ variant: 'filledRed' }}
      />
    </>
  );
};

export default BlogPostContent;
