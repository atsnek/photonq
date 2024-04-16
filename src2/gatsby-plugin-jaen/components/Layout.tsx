import { LayoutProps } from '@atsnek/jaen';
import AppLayout from '../../shared/containers/AppLayout';
import { useLocation } from '@reach/router';
import { CMSManagement, useJaenFrameMenuContext } from 'gatsby-plugin-jaen';
import { useEffect } from 'react';
import { useAppStore } from '../../shared/store/store';
import { FaFlask } from '@react-icons/all-files/fa/FaFlask';

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  const path = useLocation().pathname;
  const hiddenTopNavPaths = ['/profile', '/blog-post'];
  const fetchUser = useAppStore(state => state.currentUser.fetchUser);

  const docsPaths = ['/docs'];

  const jaenFrame = useJaenFrameMenuContext();

  useEffect(() => {
    jaenFrame.extendAddMenu({
      experimentNew: {
        label: 'New experiment',
        icon: FaFlask,
        path: '/new/experiment'
      }
    });

    fetchUser(); // Fetches the currently logged in user
  }, []);

  if (path.startsWith('/admin') || path === '/') {
    return children;
  }

  return (
    <CMSManagement>
      <AppLayout
        isDocs={
          docsPaths.some(docsPath => path.startsWith(docsPath)) ||
          ['/experiments/', '/experiments'].includes(path)
        }
        isCommunity={path.startsWith('/experiments')}
        path={path}
        topNavProps={{
          isVisible: !hiddenTopNavPaths.some(hiddenPath =>
            path.startsWith(hiddenPath)
          )
        }}
      >
        {children}
      </AppLayout>
    </CMSManagement>
  );
};

export default Layout;
