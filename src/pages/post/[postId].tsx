import { PageConfig, PageProps } from '@atsnek/jaen';

import { graphql } from 'gatsby';
import * as React from 'react';
import { DocContent } from '../../contents/DocContent';
import BlogPostContent from '../../contents/BlogPostContent';

const DocsPage: React.FC<PageProps> = ({ params }) => {
  const postId = params.postId?.trim();

  return <BlogPostContent postId={postId} mode="read" />;
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
