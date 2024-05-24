import './src/styles/global.css';

exports.onRouteUpdate = ({ location }) => {
  // Check if the current route is the privacy policy page

  if (location.pathname === '/privacy-policy') {
    window.location.replace(
      'https://dsba.univie.ac.at/fileadmin/user_upload/p_dsba/datenschutzerklaerung_websites_V04_26062020_EN.pdf'
    );
  }
};
