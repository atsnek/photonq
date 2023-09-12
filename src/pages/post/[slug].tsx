import { PageConfig, PageProps, useAuthenticationContext } from '@atsnek/jaen';

import { graphql } from 'gatsby';
import * as React from 'react';
import { DocContent } from '../../contents/DocContent';
import BlogPostContent from '../../contents/BlogPostContent';
import { useEffect, useState } from 'react';
import { TPost } from '../../features/post/types/post';
import { useAppStore } from '../../shared/store/store';
import { navigate } from '@reach/router';

const DocsPage: React.FC<PageProps> = ({ params }) => {
  const { user } = useAuthenticationContext();
  const slug = params.slug?.trim();

  const post = useAppStore(state => state.singlePost.post);
  const fetchPost = useAppStore(state => state.singlePost.fetchPost);

  useEffect(() => {
    if (slug) fetchPost(slug);
  }, [slug]);

  if (!slug) {
    navigate('/docs/');
    return;
  }

  return <BlogPostContent slug={slug} />;
};

export default DocsPage;

export const pageConfig: PageConfig = {
  label: 'Documentation',
  icon: 'FaBook',
  childTemplates: ['DocPage'],
  menu: {
    type: 'app',
    order: 100,
    group: 'photonq'
  }
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
