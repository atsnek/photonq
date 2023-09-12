import { FC, useState } from 'react';

// Insertable custom components (via Jaen)
import PostEditorView from '../features/post/editor/components/PostEditorView';
import PostReaderView from '../features/post/reader/components/PostReaderView';
import { navigate } from '@reach/router';
import { useAuthenticationContext } from '@atsnek/jaen';
import PostTopNav from '../features/post/components/PostTopNav';
import { useAppStore } from '../shared/store/store';
import PostLeftNav from '../features/post/components/PostLeftNav';
import MainFlex from '../shared/containers/components/MainFlex';
import PostReader from '../features/post/components/PostReader';
import MainGrid from '../shared/containers/components/MainGrid';
import PostEditor from '../features/post/components/PostEditor';

export interface IBlogPostContentProps {
  slug: string;
}

/**
 * Content for the blog post page (reading and editing).
 */
const BlogPostContent: FC<IBlogPostContentProps> = ({ slug }) => {
  const [viewMode, setViewMode] = useState<'read' | 'edit'>('read');
  const [isRating, setIsRating] = useState(false);

  const author = useAppStore(state => state.singlePost.postAuthor);
  const currentUser = useAppStore(state => state.currentUser.userMe);
  const post = useAppStore(state => state.singlePost.post);
  const togglePostRating = useAppStore(
    state => state.singlePost.togglePostRating
  );

  const setPostPreviewImage = (src: File) => {
    //TODO
  };

  const handlePublish = () => {
    //TODO
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

  const MainWrapper = viewMode === 'read' ? MainGrid : MainFlex;

  return (
    <>
      <PostTopNav
        author={author}
        handlePublish={handlePublish}
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
    </>
  );
};

export default BlogPostContent;
