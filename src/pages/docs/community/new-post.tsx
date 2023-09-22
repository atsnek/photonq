import { PageConfig, PageProps, useAuthenticationContext } from '@atsnek/jaen';
import { graphql } from 'gatsby';
import BlogPostContent from '../../../contents/BlogPostContent';
import useAuth from '../../../shared/hooks/use-auth';
import { navigate } from '@reach/router';
import { useEffect } from 'react';
import { useAppStore } from '../../../shared/store/store';

const NewPostPage: React.FC<PageProps> = () => {
  const isAuthenticated = useAuthenticationContext().user !== null;
  const createEmptyPost = useAppStore(
    state => state.singlePost.createEmptyPost
  );

  if (!isAuthenticated) navigate('/docs/');

  useEffect(() => {
    createEmptyPost();
  }, []);

  return <BlogPostContent isNewPost />;
};

export default NewPostPage;

export const pageConfig: PageConfig = {
  label: 'New post',
  icon: 'FaBook',
  breadcrumbs: [
    {
      label: 'schettn',
      path: '/user/schettn/'
    },
    {
      label: 'New post',
      path: '/docs/community/new-post/'
    }
  ],
  menu: {
    type: 'user',
    label: 'New community post'
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
