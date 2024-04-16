import { PageConfig, PageProps } from '@atsnek/jaen';

import { graphql } from 'gatsby';
import * as React from 'react';
import BlogPostContent from '../../contents/BlogPostContent';
import { useEffect } from 'react';
import { useAppStore } from '../../shared/store/store';
import { navigate } from '@reach/router';

const DocsPage: React.FC<PageProps> = ({ params }) => {
  const slug = params.slug?.trim();
  const post = useAppStore(state => state.singlePost.post);

  const resetStoreState = useAppStore(state => state.singlePost.reset);
  const fetchPost = useAppStore(state => state.singlePost.fetchPost);

  useEffect(() => {
    resetStoreState();
    if (slug) {
      fetchPost(slug).then(succeed => {
        if (!succeed) navigate('/docs/');
      });
    }
  }, [slug]);

  useEffect(() => {
    const prevTitle = document.title;
    if (post) {
      document.title = post.title;
    }

    return () => {
      document.title = prevTitle;
    };
  }, [post]);

  useEffect(() => {}, []);

  if (!slug) {
    //? This could currently cause some issues with the SSR
    navigate('/docs/');
    return;
  }

  return <BlogPostContent slug={slug} />;
};

export default DocsPage;

export const pageConfig: PageConfig = {
  label: 'Blog Post',
  icon: 'FaBlog',
  withoutJaenFrameStickyHeader: true,
};

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`;

export { Head } from '@atsnek/jaen';
