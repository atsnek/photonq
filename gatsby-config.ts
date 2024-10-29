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
          organizationId: '268207341512496739',
          clientId: '268418317486724723@photonq',
          authority: 'https://accounts.photonq.org',
          redirectUri:
            process.env.NODE_ENV === 'production'
              ? 'https://photonq.org'
              : 'http://localhost:8000',
          projectIds: ['263491274097563233']
        },
        sentry: {
          org: 'photonq',
          project: 'photonq-org',
          dsn: 'https://0351d2d359e678723fc0215bfcb90356@sentry.cronit.io/17'
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
    },
    `gatsby-jaen-lens`
  ]
};

export default config;
