import { PageConfig, PageProps } from '@atsnek/jaen';
import { navigate } from '@reach/router';
import BlogPostContent from '../../../contents/BlogPostContent';

const Page: React.FC<PageProps> = ({ location, pageContext, params }) => {
  // everything after /user/ is the handle
  const handle = location.pathname.split('/user/')[1];
  const postID = params.postId;

  if (!postID) navigate('/docs');

  return <BlogPostContent postId={postID} />;
};

export default Page;

export const pageConfig: PageConfig = {
  label: 'User [...]',
  icon: 'FaUser',
  breadcrumbs: [
    {
      label: 'schettn',
      path: '/user/schettn/'
    }
  ]
};
