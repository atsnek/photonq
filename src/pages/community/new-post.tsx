import { PageConfig, PageProps, useAuthenticationContext } from '@atsnek/jaen';
import { graphql } from 'gatsby';
import BlogPostContent from '../../contents/BlogPostContent';
import useAuth from '../../shared/hooks/use-auth';
import { navigate } from '@reach/router';
import { useEffect } from 'react';
import { useAppStore } from '../../shared/store/store';
import { sq } from '@snek-functions/origin';

const NewPostPage: React.FC<PageProps> = () => {
  const isAuthenticated = useAuthenticationContext().user !== null;
  const createEmptyPost = useAppStore(
    state => state.singlePost.createEmptyPost
  );
  const resetStoreState = useAppStore(state => state.singlePost.reset);

  if (!isAuthenticated) navigate('/docs/');

  useEffect(() => {
    resetStoreState();
    createEmptyPost();
  }, []);

  return <BlogPostContent isNewPost />;
};

export default NewPostPage;

export const pageConfig: PageConfig = {
  label: 'New post',
  icon: 'FaBook',
  breadcrumbs: [
    // async () => {
    //   let [username] = await sq.query(q => q.userMe?.username);
    //   if (!username) username = '';
    //   return { label: username, path: `/user/${username}` };
    // },
    {
      label: 'New post',
      path: '/community/new-post/'
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
