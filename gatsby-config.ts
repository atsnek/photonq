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
        remote: {
          repository: 'atsnek/photonq'
        },
        zitadel: {
          organizationId: '261017026250670083',
          clientId: '252746210698395651@services',
          authority: 'https://accounts.cronit.io',
          redirectUri:
            process.env.NODE_ENV === 'production'
              ? 'https://photonq.org'
              : 'http://localhost:8000',
          projectIds: [
            '252765861113233411',
            '252899191242620931',
            '260237544631828483'
          ]
        },
        sentry: {
          org: 'photonq',
          project: 'website',
          dsn: 'https://37ffbc7589f79cfab5936ce5fca4f310@sentry.cronit.io/10'
        },
        googleAnalytics: {
          trackingIds: ['G-M58K75M9PG']
        }
      }
    },
    `gatsby-jaen-mailpress`
  ]
};

export default config;
