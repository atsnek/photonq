import { PageConfig, PageProps, useAuthenticationContext } from '@atsnek/jaen';
import UserProfileContent from '../../contents/UserProfileContent';
import { navigate } from '@reach/router';

const Page: React.FC<PageProps> = () => {
  const { user } = useAuthenticationContext();

  if (user === null) {
    navigate('/docs/');
    return;
  }

  navigate(`/user/${user.username}/`);

  return <></>;
};

export default Page;

export const pageConfig: PageConfig = {
  label: 'User'
};
