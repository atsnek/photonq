import { FC, useEffect, useRef, useState } from 'react';
import PostTopNav from '../features/post/components/PostTopNav';
import { useAppStore } from '../shared/store/store';
import PostLeftNav from '../features/post/components/PostLeftNav';
import MainFlex from '../shared/containers/components/MainFlex';
import PostReader from '../features/post/components/PostReader';
import MainGrid from '../shared/containers/components/MainGrid';
import PostEditor from '../features/post/components/PostEditor';
import PostActionToolbar from '../features/post/components/PostActionToolbar';
import Alert from '../shared/components/alert/Alert';
import { useBreakpointValue, useDisclosure, useToast } from '@chakra-ui/react';
import { EnPostLanguage, TPostViewMode } from '../features/post/types/post';
import { useAuthenticationContext } from '@atsnek/jaen';
import {
  HistoryUnsubscribe,
  globalHistory,
  navigate,
  useLocation
} from '@reach/router';
import { wait } from '../shared/utils/utils';
import PostMobileMetaEditor from '../features/post/components/PostMobileMetaEditor';

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
  const [viewMode, setViewMode] = useState<TPostViewMode>(
    isNewPost ? 'edit' : 'read'
  );
  const [madeChanges, setMadeChanges] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [newPostPreviewImage, setNewPostPreviewImage] = useState<File>();
  const [isPreviewImageUploading, setIsPreviewImageUploading] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  const deletePostDisclosure = useDisclosure();
  const isAuthenticated = useAuthenticationContext().user !== null;
  const saveToast = useToast();
  const location = useLocation();
  const showMobileMetaEditor = useBreakpointValue({ base: true, md: false });

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
  const changeLanguage = useAppStore(state => state.singlePost.changeLanguage);
  const createNewPost = useAppStore(state => state.singlePost.createNewPost);
  const savePost = useAppStore(state => state.singlePost.savePost);

  const deletePost = useAppStore(state => state.singlePost.deletePost);

  useEffect(() => {
    // If the user made changes to the post, ask for confirmation before leaving the page
    let historyListener: HistoryUnsubscribe | undefined = undefined;
    if (madeChanges) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      historyListener = globalHistory.listen(
        ({ action, location: historyLocation }) => {
          if (location.pathname === historyLocation.pathname) return;
          if (
            action === 'PUSH' &&
            (location.pathname === '/new/experiment' ||
              location.pathname.includes('/post/')) &&
            !isSavingPost
          ) {
            if (
              !window.confirm(
                'Are you sure you want to leave this page? Your changes will be lost.'
              )
            ) {
              globalHistory.navigate(location.pathname);
            }
          }
        }
      );
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (historyListener) historyListener();
    };
  }, [madeChanges, isSavingPost]);

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

  const isPostAuthor =
    isNewPost || (!!currentUser && currentUser?.id === author?.id);
  const canEditPost = isPostAuthor && viewMode === 'edit'; //TODO: Maybe we find a better name for this variable

  const MainWrapper = viewMode === 'read' ? MainGrid : MainFlex;

  const handleSavePost = async () => {
    if (!madeChanges) return;
    if (post?.title.trim().length === 0) {
      titleRef.current?.focus();
      return;
    }
    setIsSavingPost(true);
    if (isNewPost) {
      const slug = await createNewPost(newPostPreviewImage);
      if (slug) {
        await wait(750); // Make sure the new post is created before navigating to it
        navigate(`/experiments/${slug}/`);
      }
      if (slug) window.removeEventListener('beforeunload', handleBeforeUnload);
    } else {
      const succeed = await savePost();
      saveToast({
        position: 'bottom-right',
        duration: 3000,
        status: succeed ? 'success' : 'error',
        title: succeed ? 'Post saved' : 'Post could not be saved'
      });
    }
    setMadeChanges(false);
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
      {!isDeletingPost && showMobileMetaEditor && (
        <PostMobileMetaEditor
          post={post}
          titleRef={titleRef}
          handleTitleChange={handleTitleChange}
          handleSummaryChange={handleSummaryChange}
          setPostPreviewImage={setPostPreviewImage}
          canEdit={canEditPost && !isDeletingPost}
          isAuthor={isPostAuthor}
          isPostPreviewImageUploading={isPreviewImageUploading}
          handleLanguageChange={handleLanguageChange}
          handleTogglePrivacy={handleTogglePrivacy}
        />
      )}
      <MainWrapper>
        <PostLeftNav
          setViewMode={setViewMode}
          handleSummaryChange={handleSummaryChange}
          setPostPreviewImage={setPostPreviewImage}
          canEdit={canEditPost && !isDeletingPost}
          isAuthor={isPostAuthor}
          post={post}
          isPostPreviewImageUploading={isPreviewImageUploading}
          handleLanguageChange={handleLanguageChange}
          handleTogglePrivacy={handleTogglePrivacy}
          handleSavePost={handleSavePost}
        />
        {canEditPost ? (
          <PostEditor
            titleRef={titleRef}
            post={post}
            handleTitleChange={handleTitleChange}
            setIsSavingPost={setIsSavingPost}
            madeChanges={madeChanges}
            setMadeChanges={setMadeChanges}
          />
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
      <Alert
        disclosure={deletePostDisclosure}
        body="Are you sure you want to delete this experiment? This action cannot be undone!"
        header="Delete this experiment?"
        confirmationAction={handleDeletePostConfirmation}
        confirmationProps={{ variant: 'filledRed' }}
      />
    </>
  );
};

export default BlogPostContent;
