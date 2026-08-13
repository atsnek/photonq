import { useEffect, useState } from 'react';

import { buildSearchIndex } from '../../utils/search/build-search-index';
import { getBuiltSearchIndex } from '../../utils/search/get-built-search-index';
import { mergeSearchIndex } from '../../utils/search/merge-search-index';
import { SearchIndex } from './types';
import { useDynamicPaths } from 'jaen';
import { useJaenPagePaths } from 'gatsby-plugin-jaen';
import { useAppSelector } from 'jaen';
import { getDefaultSearchDocs, searchDocs } from '../../utils/search';
import { TSearchResultSection } from '../../utils/search/types';

/**
 * Represents the result of the useSearch hook.
 */
export interface UseSearchResult {
  /**
   * The search index containing the merged data.
   */
  searchResults: TSearchResultSection[];
  /**
   * Indicates whether the search index is still loading.
   */
  isLoading: boolean;
}

/**
 * Custom hook for searching content within a Jaen website.
 * @param query The current search query.
 * @param enabled Whether the index may be loaded. Nothing renders search
 *   results before the modal is opened, so the index is left unfetched
 *   until then. Once loaded it stays loaded, so re-opening the modal costs
 *   nothing.
 * @returns The search index and loading status.
 */
const useDocsSearch = (query?: string, enabled = true): UseSearchResult => {
  const [searchIndex, setSearchIndex] = useState<SearchIndex | null>(null);

  const pages = useAppSelector(state => state.page.pages.nodes);

  const paths = useJaenPagePaths();
  const dynamicPaths = useDynamicPaths({
    staticPages: paths.allJaenPage.nodes
  });

  useEffect(() => {
    /**
     * Loads the search index by merging the builtSearchIndex with the page search index.
     */
    const loadSearchIndex = async () => {
      // getBuiltSearchIndex holds a module-level promise, so this is one
      // request per document no matter how many SearchMenus are mounted.
      const builtSearchIndex = await getBuiltSearchIndex();

      const pageValuesWithId = Object.entries(pages).map(([pageId, value]) => {
        const dynamicPagePath = Object.entries(dynamicPaths).find(
          ([_, node]) => node.jaenPageId === pageId
        )?.[0];

        const builtPagePath = Object.entries(builtSearchIndex).find(
          ([_, node]) => node.id === pageId
        )?.[0];

        const title =
          value?.jaenPageMetadata?.title ||
          (builtPagePath ? builtSearchIndex[builtPagePath]?.title : undefined);

        return {
          ...value,
          jaenPageMetadata: {
            ...value.jaenPageMetadata,
            title
          },
          id: pageId,
          path: dynamicPagePath || builtPagePath,
          type: value?.template
        };
      });

      const pageSearchIndex = await buildSearchIndex(pageValuesWithId as any);
      const merged = mergeSearchIndex(builtSearchIndex, pageSearchIndex);

      setSearchIndex(merged);
    };

    if (!enabled) return;

    void loadSearchIndex();
  }, [enabled, pages, dynamicPaths]);

  const [searchResults, setSearchResults] = useState<TSearchResultSection[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);

      if (!searchIndex) {
        // Either nothing has been requested yet (search still closed) or the
        // index is in flight. The modal is the only consumer and it shows a
        // spinner while loading, so staying "loading" here is what keeps the
        // first open from flashing an empty result list.
        setSearchResults([]);

        return;
      }

      if (!query) {
        setSearchResults(searchDocs('OpenQASM', searchIndex));
      } else {
        const docsResults = searchDocs(query, searchIndex);

        setSearchResults(docsResults);
      }

      setIsLoading(false);
    };

    void search();
  }, [searchIndex, query]);

  return {
    searchResults,
    isLoading
  };
};

export default useDocsSearch;
