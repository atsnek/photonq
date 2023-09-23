import { PageConfig, PageProps } from '@atsnek/jaen';
import UserProfileContent from '../../contents/UserProfileContent';
import { navigate } from '@reach/router';
import { useAppStore } from '../../shared/store/store';
import { useEffect } from 'react';

const Page: React.FC<PageProps> = ({ location, pageContext, params }) => {
  // everything after /user/ is the handle
  const handle = location.pathname.split('/user/')[1];
  const username = params.username?.trim();

  const userDisplayName = useAppStore(
    state => state.profile.profile?.displayName
  );

  if (!username) navigate('/docs');

  useEffect(() => {
    if (userDisplayName) {
      document.title = userDisplayName;
    }
  }, [userDisplayName]);

  return <UserProfileContent username={username} />;
};

export default Page;

export const pageConfig: PageConfig = {
  label: 'User [...]',
  icon: 'FaUser',
  breadcrumbs: [
    async () => {
      // get username from url
      let username = window.location.pathname.split('/user/')[1];

      // Remove trailing slash
      if (username.endsWith('/')) {
        username = username.substring(0, username.length - 1);
      }

      return { label: username, path: `/user/${username}` };
    }
  ],
  menu: {
    type: 'user',
    label: 'Your profile',
    path: ({ auth }) => {
      return `/user/${auth.user?.username}`;
    }
  }
};
