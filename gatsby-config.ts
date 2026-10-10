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
        /**
         * `zitadel` is `zitadelGql` in the v3 plugin, same shape.
         *
         * The rename is not cosmetic: jaen no longer talks to Zitadel's own
         * management API from the browser, it talks to a zitadel-gql facade in
         * front of it, and `graphqlUrl` is where that lives. It defaults to
         * `${authority}/graphql`, which is what this relies on. If
         * accounts.photonq.org is a plain Zitadel with no facade in front, sign
         * in still works — that half is OIDC against `authority` — but the CMS
         * user-management screens under /cms/accounts have nothing to query.
         */
        zitadelGql: {
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
      /**
       * `gatsby-jaen-mailpress` is gone. emailwerk is mailpress v3, and the
       * published mailpress plugin is a Chakra v2 package, so keeping it would
       * pull the old runtime back into the bundle it was just removed from.
       *
       * The endpoint is photonq's own emailwerk instance. netsnek.com uses
       * emailwerk.com, which photonq.org cannot share, because emailwerk
       * trusts tokens from a single issuer and photonq.org signs in against
       * accounts.photonq.org. The mailpress pylon this used to point at
       * (/mailpress/graphql) is switched off. It never had the schema this
       * plugin speaks, so the CMS mail screens failed against it with
       * "Cannot query field templates". The option is named `url`, not
       * `pylonUrl`.
       */
      resolve: `gatsby-jaen-emailwerk`,
      options: {
        url: 'https://pylons.photonq.org/emailwerk/graphql'
      }
    },
    `gatsby-jaen-lens`
  ]
};

export default config;
