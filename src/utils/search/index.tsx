import { sq } from '@/clients/social';
import { FaFlask } from '@react-icons/all-files/fa/FaFlask';
import { UseSearchResult, SearchIndex } from '../../hooks/use-search';
import {
  TSearchMetadata,
  TSearchResult,
  TSearchResultSection,
  TSearchResults
} from './types';
// import { getUserDisplayname } from '../../features/user/utils/user';
import TbIndentIncrease from '../../components/icons/tabler/TbIndentIncrease';
import TbBooks from '../../components/icons/tabler/TbBooks';
import TbUser from '../../components/icons/tabler/TbUser';

import FlexSearch from 'flexsearch';

/**
 * Searches the docs for the given query.
 * @param query  The query to search for
 * @returns  The search results
 */
export function searchDocs(
  query: string,
  searchIndex: SearchIndex
): TSearchResultSection[] {
  // Initialize FlexSearch index
  const index = new FlexSearch.Index({
    tokenize: 'full',
    limit: 5
  });

  // Add documents to the index
  Object.entries(searchIndex).forEach(([path, document]) => {
    index.add(path, document.title);
    // You can add more fields for searching here if needed

    Object.entries(document.data).forEach(([key, value]) => {
      const dataTile = key.split('#')[1] || key;

      if (dataTile) {
        index.add(`${path}____${key}____title`, dataTile);
      }

      index.add(`${path}____${key}____data`, value);
    });
  });

  // Perform searchs
  const results = index.search({
    query,
    limit: 5
  });

  const searchResults: {
    [path: string]: {
      document: {
        id: string;
        title: string;
        data: Record<string, string>;
      };
    };
  } = {};

  for (const id of results) {
    const [path, dataKey, dataType] = id.toString().split('____');

    const document = searchIndex[path];

    if (!document) {
      continue;
    }

    // Find matched part of the title
    const matchedTitle = document.title;

    // Find matched data keys and their respective matched parts

    let dataTitle = null;

    if (dataType === 'title') {
      // split at first # and get the second part (also when there are multiple #)
      const title = dataKey.split('#').slice(1).join('#') || dataKey;

      dataTitle = title;
    }

    const dataMatch = getRangeAroundMatch(document.data[dataKey], query);

    const searchResult = searchResults[path];

    if (searchResult) {
      if (dataKey) {
        if (!searchResult.document.data[dataKey]) {
          searchResult.document.data[dataKey] = document.data[dataKey];
        }
      }

      searchResult.document.title = matchedTitle || document.title;
    } else {
      searchResults[path] = {
        document: {
          id: document.id,
          title: matchedTitle || document.title,
          data: {}
        }
      };

      if (dataKey) {
        searchResults[path].document.data[dataKey] = document.data[dataKey];
      }
    }
  }

  function getRangeAroundMatch(str: string, query: string) {
    if (!str) return null;

    const index = str.toLowerCase().indexOf(query.toLowerCase());
    const start = Math.max(0, index - 20);
    const end = Math.min(str.length, index + query.length + 20);

    return str.slice(start, end);
  }

  // Return the search results
  return Object.entries(searchResults).map(([path, result]) => {
    return {
      title: result.document.title,
      results: Object.entries(result.document.data).map(([key, value]) => {
        const slug = key.split('#')[0];
        const title = key.split('#')[1] || key;

        return {
          description: value,
          to: slug ? `${path}#${slug}` : path,
          title: title
        };
      }),
      icon: <TbBooks />,
      resultIcon: <TbIndentIncrease />
    };
  });
}

export function getDefaultSearchDocs(
  data: SearchIndex
): TSearchResultSection[] {
  const results: TSearchResultSection[] = [];
  Object.keys(data).forEach(key => {
    if (!key.startsWith('/docs/') || key === '/docs/') return;
    const item = data[key];
    const summary = Object.keys(item.data)
      .find(key => key.length > 0 && item.data[key].length > 0)
      ?.slice(0, 100);
    results.push({
      title: item.title,
      results: [
        {
          description: summary ?? item.title ?? '',
          to: key,
          title: item.title ?? ''
        }
      ],
      resultIcon: <TbIndentIncrease />
    });
  });
  return results;
}

/**
 * Search the experiments for the given query.
 * @param query The query to search for
 * @returns  The search results
 */
export async function searchSocialPosts(
  query?: string
): Promise<TSearchResultSection[]> {
  const [posts, postsError] = await sq.query(q => {
    const posts =
      query && query.length > 0
        ? q.allPost({
            query,
            pagination: {
              first: 10
            }
          })
        : q.allTrendingPost({
            pagination: {
              first: 10
            }
          });

    const sections: TSearchResultSection[] = [];
    posts.nodes.map(pn => {
      const username = pn.user().profile?.userName ?? '';
      sections.push({
        title: pn.title,
        results: [
          {
            description:
              pn.matchingQuery({ query: query || '' }) ??
              pn.summary ??
              pn.title,
            to: `/experiments/${pn.slug}`,
            title: `${username}/${pn.title}`
          }
        ]
      });
    });

    return sections;
  });

  return !postsError || postsError?.length === 0 ? posts : [];
}
