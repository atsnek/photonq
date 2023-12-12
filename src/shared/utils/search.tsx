const FlexSearch = require('flexsearch');
import { sq } from '@snek-functions/origin';
import { FaFlask } from '@react-icons/all-files/fa/FaFlask';
import { UseSearchResult, useSearch } from '../../search/use-search';
import {
  TSearchMetadata,
  TSearchResult,
  TSearchResultSection,
  TSearchResults
} from '../types/search';
import { filterWhitespaceItems } from './utils';
import { getUserDisplayname } from '../../features/user/utils/user';
import TbIndentIncrease from '../components/icons/tabler/TbIndentIncrease';
import { SnekUser } from '@atsnek/jaen';
import { SearchIndex } from '../../search/types';
import TbBooks from '../components/icons/tabler/TbBooks';
import TbUser from '../components/icons/tabler/TbUser';

/**
 * Searches the docs for the given query.
 * @param query  The query to search for
 * @returns  The search results
 */
export async function searchDocs(
  query: string,
  data: UseSearchResult['searchIndex']
): Promise<TSearchResultSection[]> {
  // This indexes a whole page by its content and stores the title.
  const pageIndex = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: ['title', 'content'],
      store: ['title', 'content', 'url']
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true
    }
  });

  // This indexes a certain section of a page by its content and stores multiple values about it.
  const sectionIndex = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'content',
      tag: 'pageId',
      store: ['title', 'content', 'url', 'display']
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true
    }
  });

  let pageId = 0;
  for (const [path, item] of Object.entries(data)) {
    let pageContent = ''; // This will be the content of the whole page.

    for (const heading of Object.keys(item.data)) {
      const [anchor, title] = heading.split('#');
      const url = `${path}#${anchor}`;

      const text = item.data[heading];

      const content = text ?? title ?? item.title ?? '';

      sectionIndex.add({
        id: url,
        url,
        title,
        pageId: `page_${pageId}`,
        content: title,
        display: content
      });

      const splittedParagraphs = filterWhitespaceItems(text.split('\n'));

      for (let i = 0; i < splittedParagraphs.length; i++) {
        const paragraph = splittedParagraphs[i];

        sectionIndex.add({
          id: `${url}#${i}`,
          url,
          title,
          pageId: `page_${pageId}`,
          content: paragraph,
          display: paragraph
        });
      }

      if (title) {
        pageContent += ` ${title}`;
      }
      if (content) {
        pageContent += ` ${content}`;
      }
    }

    // Add the page to the page index.
    pageIndex.add({
      id: pageId,
      url: path,
      title: item.title,
      content: pageContent
    });
    pageId++;
  }

  // Search for hits in the whole pages.
  const pageResults =
    pageIndex.search(query, {
      limit: 5,
      enrich: true,
      suggest: true
    })[0]?.result ?? [];

  const searchResults: Array<TSearchResultSection & TSearchMetadata> = [];
  const pageTitleMatches: Record<number, number> = {};
  //TODO: We need to provide a search data record for the first page title and the first paragraph. Otherwise, the page itself will never be shown, but only it's sections.
  //! Current issue: If the query matches a subtitle of a page or the page title itself, the page result is empty because pageContent doesnt contain those texts.
  for (let i = 0; i < pageResults.length; i++) {
    pageTitleMatches[i] = 0;
    const pageResult = pageResults[i];
    const searchResultItems: Array<TSearchResult> = [];
    // searchResults.push({
    //   _page_matches: pageTitleMatches[i],
    //   _section_matches: 0,
    //   title: pageResult.doc.title,
    //   results: [
    //     {
    //       title: pageResult.doc.title,
    //       description: pageResult.doc.content ?? pageResult.doc.title,
    //       href: pageResult.doc.url ?? '#'
    //     }
    //   ]
    // });

    //Search for hits in the sections of the page.
    const sectionResults =
      sectionIndex.search(query, 5, {
        // offset: i * 5,
        // limit: 5,
        enrich: true,
        suggest: true,
        tag: `page_${pageResult.id}`
      })[0]?.result ?? [];

    const occured: Record<string, boolean> = {};
    // We set an additional limit since flexsearch doesn't seem to work with the offset and either ot both limit parameters.
    for (let j = 0; j < Math.min(sectionResults.length, 5); j++) {
      const sectionResult = sectionResults[j];
      if (sectionResult.doc.display !== undefined) {
        pageTitleMatches[i]++;
      }

      const key =
        sectionResult.doc.url +
        '@' +
        (sectionResult.doc.display ?? sectionResult.doc.content);

      if (occured[key]) {
        continue;
      }
      occured[key] = true;

      searchResultItems.push({
        title:
          sectionResult.doc.content ??
          sectionResult.doc.title ??
          pageResult.doc.title,
        description: sectionResult.doc.content ?? sectionResult.doc.title,
        href: sectionResult.doc.url
      });
    }

    if (sectionResults.length === 0) {
      //* This is a temporary solution until we have a page record in the search data (see todo above loop).
      searchResultItems.push({
        title: pageResult.doc.title,
        description: pageResult.doc.content ?? pageResult.doc.title,
        href: pageResult.doc.url ?? '#'
      });
    }

    //Add the result section to the search results.
    searchResults.push({
      _page_matches: pageTitleMatches[i],
      _section_matches: sectionResults.length,
      title: pageResult.doc.title,
      results: searchResultItems,
      resultIcon: <TbIndentIncrease />
    });
  }
  const res = searchResults.sort((a, b) => {
    if (a._page_matches !== b._page_matches) {
      return b._page_matches - a._page_matches;
    }
    return a._section_matches === b._section_matches
      ? 0
      : b._section_matches - a._section_matches;
  });
  return res;
}

export async function getDefaultSearchDocs(
  data: UseSearchResult['searchIndex']
): Promise<TSearchResultSection[]> {
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
          href: key,
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
        ? q.allSocialPost({
            resourceId: __SNEK_RESOURCE_ID__,
            filters: { query },
            first: 10
          })
        : q.allSocialPostTrending({
            resourceId: __SNEK_RESOURCE_ID__,
            first: 10
          });

    const sections: TSearchResultSection[] = [];
    posts.nodes.map(pn => {
      const username = pn.profile?.user?.username ?? '';
      sections.push({
        title: pn.title,
        results: [
          {
            description: pn.matchingQuery ?? pn.summary ?? pn.title,
            href: `/experiments/${pn.slug}`,
            title: `${username}/${pn.title}`
          }
        ]
      });
    });

    return sections;
  });

  return !postsError || postsError?.length === 0 ? posts : [];
}

/**
 * Search the users for the given query.
 * @param query The query to search for
 * @returns  The users matching the query
 */
export async function searchUser(
  query: string
): Promise<TSearchResultSection[]> {
  const [searchResult, error] = await sq.query(q => {
    const user = q.user({ login: query, resourceId: __SNEK_RESOURCE_ID__ });

    const sections: TSearchResultSection[] = [];
    if (!user) sections;

    sections.push({
      title: user.username,
      results: [
        {
          avatarURL: user.details?.avatarURL ?? undefined,
          description: user.profile?.bio ?? user.username,
          href: `/user/${user.username}`,
          title: getUserDisplayname(user)
        }
      ]
    });
    return sections;
  });

  return !error || error?.length === 0 ? searchResult : [];
}

/**
 * Get the default search results for the given user.
 * @param currentUserId  The id of the current user
 * @returns  The default search results
 */
export async function getDefaultSearchUsers(
  currentUserId: string
): Promise<TSearchResultSection[]> {
  if (!currentUserId) return [];
  const [followerCon, followerConError] = await sq.query(q => {
    const followers = q
      .user({ resourceId: __SNEK_RESOURCE_ID__, id: currentUserId })
      .profile?.followers({ first: 5 });
    followers?.nodes.map(fn => fn.follower.id);
    return followers;
  });
  if (!followerCon || followerConError?.length > 0) return [];

  const results = await Promise.all(
    followerCon.nodes.map(async (fn): Promise<TSearchResult> => {
      const [follower] = await sq.query(q => {
        const user = q.user({
          resourceId: __SNEK_RESOURCE_ID__,
          id: fn.follower.id
        });
        user.details?.firstName;
        user.details?.lastName;
        user.username;
        return user;
      });
      return {
        description: follower.profile?.bio ?? follower.username,
        href: `/user/${follower.username}`,
        title: getUserDisplayname(follower)
      };
    })
  );

  return [
    {
      title: 'Users',
      results
    }
  ];
}

/**
 * Get the default search results for the given user.
 * @param currentUserId  The id of the current user
 * @param searchIndex  The search index to use
 * @returns  The default search results
 */
export async function fetchDefaultSearchresult(
  userId: SnekUser['id'] | undefined,
  searchIndex: SearchIndex
): Promise<TSearchResults> {
  const userResults: TSearchResultSection[] = userId
    ? await getDefaultSearchUsers(userId)
    : [
        {
          title: 'users',
          results: [
            { title: 'Create an account', href: '/signup', description: '' }
          ]
        }
      ];
  const docsResults = await getDefaultSearchDocs(searchIndex);
  const socialPostResults = await searchSocialPosts();

  return {
    docs: { title: 'Documentation', sections: docsResults, icon: <TbBooks /> },
    posts: {
      title: 'Experiments',
      sections: socialPostResults,
      icon: <FaFlask />
    },
    user: { title: 'Users', sections: userResults, icon: <TbUser /> }
  };
}
