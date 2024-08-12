import { PageConfig, PageProps } from 'jaen';

import { graphql, navigate } from 'gatsby';
import * as React from 'react';

const Page: React.FC<PageProps> = () => {
  React.useEffect(() => {
    navigate(
      'https://dsba.univie.ac.at/fileadmin/user_upload/p_dsba/datenschutzerklaerung_websites_V04_26062020_EN.pdf'
    );
  }, []);

  return null;
};

export default Page;

export const pageConfig: PageConfig = {
  label: 'Privacy Policy',
  icon: 'FaPassport'
};

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
  }
`;

export { Head } from 'jaen';
