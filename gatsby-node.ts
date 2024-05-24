import { PageConfig } from '@atsnek/jaen';
import { GatsbyNode } from 'gatsby';
import path from 'path';
import fs from 'fs';
import { buildSearchIndex } from './src/search/build-search-index';

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
