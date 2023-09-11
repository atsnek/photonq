import { FC, useState } from 'react';

// Insertable custom components (via Jaen)
import PostEditorView from '../features/post/editor/components/PostEditorView';
import PostReaderView from '../features/post/reader/components/PostReaderView';
import { navigate } from '@reach/router';
import { useAuthenticationContext } from '@atsnek/jaen';

export interface IBlogPostContentProps {
  postId?: string;
  mode: 'read' | 'edit';
}

/**
 * Content for the blog post page (reading and editing).
 */
const BlogPostContent: FC<IBlogPostContentProps> = ({ postId, mode }) => {
  const [viewMode, setViewMode] = useState<'read' | 'edit'>(mode);

  if (mode === 'read' && !postId) navigate('/docs/');

  return viewMode === 'edit' ? (
    <PostEditorView />
  ) : (
    <PostReaderView postId={postId ?? ''} />
  );
};

export default BlogPostContent;
