import { PageConfig, PageProps } from 'jaen';
import { Global } from '@emotion/react';

import { graphql } from 'gatsby';
import AboutUs from '../components/sections/AboutUs';
import Features from '../components/sections/Features';
import Hero from '../components/sections/Hero';
import PhotonQ from '../components/sections/PhotonQ';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      {/* `html` as well as `body`. The site's globals give `html` the regular
          page background so that it covers the whole canvas (see system.ts),
          and on this page that would be white or gray.800 wherever the
          sections leave the canvas showing, such as the rounded bottom
          corners of the last section above the footer. In v2 the canvas took
          this colour from `body`. */}
      <Global
        styles={{
          'html, body': {
            backgroundColor: '#0D0E11'
          }
        }}
      />

      <Hero />
      <Features />
      <PhotonQ />
      <AboutUs />
    </>
  );
};

export default IndexPage;

export const pageConfig: PageConfig = {
  label: 'Home Page',
  icon: 'FaHome',
  childTemplates: ['BlogPage']
};

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`;

export { Head } from 'jaen';
