import { FC, useRef, useState } from 'react';

// Insertable custom components (via Jaen)
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

export interface IBlogPostContentProps {
  slug: string;
}

/**
 * Content for the blog post page (reading and editing).
 */
const BlogPostContent: FC<IBlogPostContentProps> = ({ slug }) => {
  const [viewMode, setViewMode] = useState<'read' | 'edit'>('read');
  const [isRating, setIsRating] = useState(false);
  const [isUpdatingPrivacy, setIsUpdatingPrivacy] = useState(false);
  const privacyAlertDisclosure = useDisclosure();
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

  const toggleViewMode = () => {
    setViewMode(viewMode === 'read' ? 'edit' : 'read');
  };

  const setPostPreviewImage = (src: File) => {
    //TODO
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

  /**
   * Handles rating a post.
   * If the user has already rated the post, it will unrate it.
   */
  const handleRatePost = async () => {
    setIsRating(true);
    await togglePostRating();
    setIsRating(false);
  };

  const canEditPost = currentUser?.id === author?.id && false;
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
        canEdit={canEditPost}
        handleRatePost={handleRatePost}
        isRating={isRating}
      />
      <MainWrapper>
        <PostLeftNav
          setPostPreviewImage={setPostPreviewImage}
          canEdit={canEditPost}
          post={post}
        />
        {canEditPost ? (
          <PostEditor post={post} />
        ) : (
          <PostReader
            isAuthor={canEditPost}
            post={post}
            handleRatePost={handleRatePost}
            isRating={isRating}
          />
        )}
      </MainWrapper>
      <PostActionToolbar
        isPublic={isPostPublic}
        canEdit={canEditPost}
        handleTogglePrivacy={handleTogglePrivacy}
        isTogglingPrivacy={isUpdatingPrivacy}
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
