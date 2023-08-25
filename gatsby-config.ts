import type {GatsbyConfig} from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: true
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['`gatsby-plugin-jaen']
      }
    },
    {
      resolve: `gatsby-plugin-jaen`,
      options: {
        // The folder where the page templates are located
        pageTemplateFolder: `src/templates`,
        snekResourceId: `<YOUR_SNEK_RESOURCE_ID>`
      }
    }
  ]
}

export default config
