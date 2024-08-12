import { LayoutProps } from 'jaen';
import { useLocation } from '@reach/router';
import { FaFlask } from '@react-icons/all-files/fa/FaFlask';
import { CMSManagement, useJaenFrameMenuContext } from 'gatsby-plugin-jaen';
import { useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import Footer from '../../components/sections/Footer';

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  const path = useLocation().pathname;

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
  }, []);

  const isDocs = docsPaths.some(docsPath => path.startsWith(docsPath));

  if (path.startsWith('/admin')) {
    return children;
  }

  if (path === '/privacy-policy') {
    window.location.replace(
      'https://dsba.univie.ac.at/fileadmin/user_upload/p_dsba/datenschutzerklaerung_websites_V04_26062020_EN.pdf'
    );
  }

  return (
    <CMSManagement>
      <AppLayout footer={Footer} isDocs={isDocs} path={path}>
        {children}
      </AppLayout>
    </CMSManagement>
  );
};

export default Layout;
