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
      resolve: `gatsby-plugin-jaen`,
      options: {
        pylonUrl: 'https://pylons.photonq.org/jaen-agent/graphql',
        remote: {
          repository: 'atsnek/photonq'
        },
        zitadel: {
          organizationId: '263581005107959413',
          clientId: '263491440007517793@services',
          authority: 'https://accounts.photonq.org',
          redirectUri:
            process.env.NODE_ENV === 'production'
              ? 'https://dev.photonq.pages.dev'
              : 'http://localhost:8000',
          projectIds: ['263491274097563233']
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
    {
      resolve: `gatsby-jaen-mailpress`,
      options: {
        pylonUrl: 'https://pylons.photonq.org/mailpress/graphql'
      }
    }
  ]
};

export default config;
