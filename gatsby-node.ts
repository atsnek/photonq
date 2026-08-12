import { PageConfig } from 'jaen';
import { GatsbyNode } from 'gatsby';
import path from 'path';
import fs from 'fs';
import { buildSearchIndex } from './src/utils/search/build-search-index';

/**
 * The jaen packages are consumed via yarn `link:` from the local monorepo.
 * Their own node_modules would otherwise pull in a second copy of react,
 * emotion and chakra — alias the singletons to the site's copies.
 *
 * Two copies of @chakra-ui/react is not a size problem, it is a correctness
 * one: v3 resolves recipes and tokens through a React context created by
 * `createSystem`, and a context object from one copy is simply not the one the
 * other copy reads. Every component rendered through jaen's copy would fall
 * back to the default system and lose the site's tokens without an error.
 */
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@/clients': path.resolve(__dirname, 'src/clients'),
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
        '@emotion/react': path.resolve(
          __dirname,
          'node_modules/@emotion/react'
        ),
        '@chakra-ui/react': path.resolve(
          __dirname,
          'node_modules/@chakra-ui/react'
        ),
        // Chakra v3 has no colour mode of its own; next-themes provides it, and
        // it does so through React context. Two copies would mean two providers,
        // so the toggle would flip one subtree and leave the other behind.
        'next-themes': path.resolve(__dirname, 'node_modules/next-themes'),
        // gatsby-jaen-emailwerk comes in as a `link:` dep, so it resolves ITS
        // dependencies from the monorepo tree instead of this one. For the gqty
        // client that means a second, nested copy whose ESM build pulls gqty's
        // CommonJS files into an ESM context — webpack then parses
        // `gqty/Utils/hash.js` as a module and the bundle dies on
        // "exports is not defined" before the app ever renders.
        gqty: path.resolve(__dirname, 'node_modules/gqty'),
        graphql: path.resolve(__dirname, 'node_modules/graphql')
      }
    }
  });
};

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({
  graphql,
  reporter
}) => {
  const result = await graphql<{
    allJaenPage: {
      nodes: Array<{
        id: string;
        slug: string;
        parentPage: {
          id: string;
        } | null;
        template: string | null;
        jaenPageMetadata: {
          title: string;
        };
        jaenFields: Record<string, any> | null;
        pageConfig: PageConfig | null;
        buildPath: string;
      }>;
    };
  }>(`
    query {
      allJaenPage {
        nodes {
          id
          slug
          parentPage {
            id
          }
          template
          jaenPageMetadata {
            title
          }
          jaenFields
          pageConfig
          buildPath
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild(
      `Error while running GraphQL query. ${result.errors}`
    );

    return;
  }

  const { allJaenPage } = result.data;

  await preparePagesAndBuildSearch(allJaenPage);
};

async function preparePagesAndBuildSearch(allJaenPage: {
  nodes: Array<{
    id: string;
    slug: string;
    parentPage: {
      id: string;
    } | null;
    template: string | null;
    jaenPageMetadata: {
      title: string;
    };
    jaenFields: Record<string, any> | null;
    pageConfig: PageConfig | null;
    buildPath: string;
  }>;
}) {
  const nodesForSearchIndex = allJaenPage.nodes.map(node => {
    const originPath = node.buildPath;

    let type = node.template;

    if (type && path.extname(type)) {
      type = path.basename(type, path.extname(type));
    }

    return {
      id: node.id,
      path: originPath,
      jaenPageMetadata: node.jaenPageMetadata,
      jaenFields: node.jaenFields,
      type
    };
  });

  const searchIndex = await buildSearchIndex(nodesForSearchIndex as any);

  await fs.promises.writeFile(
    path.join('public', 'search-index.json'),
    JSON.stringify(searchIndex)
  );
}
