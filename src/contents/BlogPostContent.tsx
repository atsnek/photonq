import { FC, useState } from 'react';

// Insertable custom components (via Jaen)
import PostEditorView from '../features/post/editor/components/PostEditorView';
import PostReaderView from '../features/post/reader/components/PostReaderView';

export interface IBlogPostContentProps {}

/**
 * Content for the blog post page (reading and editing).
 */
const BlogPostContent: FC<IBlogPostContentProps> = () => {
  const [viewMode, setViewMode] = useState<'read' | 'edit'>('edit');

  const isEditViewMode = viewMode === 'edit';
  return isEditViewMode ? <PostEditorView /> : <PostReaderView />;
};

export default BlogPostContent;
