const FlexSearch = require('flexsearch');
import { useSearch } from '@snek-at/jaen';
import {
  TSearchMetadata,
  TSearchResult,
  TSearchResultSection
} from '../types/search';
import { filterWhitespaceItems } from './utils';

/**
 * Searches the docs for the given query.
 * @param query  The query to search for
 * @returns  The search results
 */
export async function searchDocs(
  query: string,
  data: ReturnType<typeof useSearch>['searchIndex']
): Promise<TSearchResultSection[]> {
  // This indexes a whole page by its content and stores the title.
  const pageIndex = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'content',
      store: ['title', 'url']
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

      const content = text ?? title;

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

      pageContent += ` ${title} ${content}`;
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

    // Search for hits in the sections of the page.
    const sectionResults =
      sectionIndex.search(query, 5, {
        // offset: i * 5,
        // limit: 5,
        enrich: true,
        suggest: true,
        tag: `page_${pageResult.id}`
      })[0]?.result ?? [];

    const occured: Record<string, boolean> = {};
    //* We set an additional limit since flexsearch doesn't seem to work with the offset and either ot both limit parameters.
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
        title: sectionResult.doc.title,
        description: sectionResult.doc.content ?? sectionResult.doc.title,
        href: sectionResult.doc.url
      });
    }

    if (sectionResults.length === 0) {
      //* This is a temporary solution until we have a page record in the search data (see todo above loop).
      searchResultItems.push({
        title: pageResult.doc.title,
        description: pageResult.doc.content ?? pageResult.doc.title,
        href: pageResult.doc.url
      });
    }

    // Add the result section to the search results.
    searchResults.push({
      _page_matches: pageTitleMatches[i],
      _section_matches: sectionResults.length,
      title: pageResult.doc.title,
      results: searchResultItems
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
