import { PageConfig, PageProps } from '@atsnek/jaen';
import { Global } from '@emotion/react';

import { graphql } from 'gatsby';
import AboutUs from '../components/sections/AboutUs';
import Features from '../components/sections/Features';
import Hero from '../components/sections/Hero';
import PhotonQ from '../components/sections/PhotonQ';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Global
        styles={{
          body: {
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

export { Head } from '@atsnek/jaen';
