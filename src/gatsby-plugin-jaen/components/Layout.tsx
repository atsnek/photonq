import { LayoutProps } from '@atsnek/jaen';
import AppLayout from '../../shared/containers/AppLayout';
import { useLocation } from '@reach/router';
import { useJaenFrameMenuContext } from 'gatsby-plugin-jaen';
import { useEffect } from 'react';
import { FaCogs } from 'react-icons/fa';

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  console.log('children: ', children);
  const path = useLocation().pathname;
  const hiddenTopNavPaths = ['/profile', '/blog-post'];

  const docsPaths = ['/docs', '/docs/community', '/docs/new-post/'];

  const jaenFrame = useJaenFrameMenuContext();

  useEffect(() => {
    jaenFrame.extendAddMenu({
      test: {
        label: 'New post',
        icon: FaCogs,
        path: '/docs/new-post/'
      }
    });
  }, []);

  if (path.startsWith('/admin') || path === '/') {
    return children;
  }

  return (
    <AppLayout
      isDocs={docsPaths.some(docsPath => path.startsWith(docsPath))}
      isCommunity={path.startsWith('/docs/community')}
      path={path}
      topNavProps={{
        isVisible: !hiddenTopNavPaths.some(hiddenPath =>
          path.startsWith(hiddenPath)
        )
      }}
    >
      {children}
    </AppLayout>
  );
};

export default Layout;
