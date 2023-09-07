import { PageConfig, PageProps } from '@atsnek/jaen';
import UserProfileContent from '../../contents/UserProfileContent';
import { navigate } from '@reach/router';

const Page: React.FC<PageProps> = ({ location, pageContext, params }) => {
  // everything after /user/ is the handle
  const handle = location.pathname.split('/user/')[1];
  const profileId = params.profileId;

  if (!profileId) navigate('/docs');

  return <UserProfileContent profileId={profileId} />;
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
  ],
  menu: {
    type: 'user',
    label: 'Your profile'
  }
};
