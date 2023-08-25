import { LayoutProps } from '@atsnek/jaen';
import { Box, Heading } from '@chakra-ui/react';
import AppLayout from '../../shared/containers/AppLayout';
import { useLocation } from '@reach/router';

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  console.log('children: ', children);
  const path = useLocation().pathname;
  const hiddenTopNavPaths = ['/profile', '/blog-post'];

  if (path.startsWith('/admin') || path === '/') {
    return children;
  }

  return (
    <AppLayout
      isDocs={path.startsWith('/docs')}
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
