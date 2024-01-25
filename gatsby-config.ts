import type { GatsbyConfig } from 'gatsby';

require('dotenv').config({
  path: `.env.public`
});

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: false
  },
  plugins: [
    `gatsby-plugin-cloudflare-pages`,
    {
      resolve: `gatsby-jaen-lens`,
      options: {
        roles: ['005559cd-c204-4919-80a9-0059f213eafc']
      }
    },
    {
      resolve: `gatsby-plugin-jaen`,
      options: {
        // The folder where the page templates are located
        pageTemplateFolder: `src/templates`,
        snekResourceId: `a58477a4-6e2a-4dca-80a9-e59d86bcac10`
      }
    },
    `gatsby-jaen-mailpress`
  ]
};

export default config;
