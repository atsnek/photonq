import { useEffect, useRef, useState } from 'react';

import { buildSearchIndex } from './build-search-index';
import { getBuiltSearchIndex } from './get-built-search-index';
import { mergeSearchIndex } from './merge-search-index';
import { SearchIndex } from './types';
import { useDynamicPaths } from '@atsnek/jaen';
import { useJaenPagePaths } from 'gatsby-plugin-jaen';
import { useAppSelector } from '@atsnek/jaen';

/**
 * Represents the result of the useSearch hook.
 */
export interface UseSearchResult {
  /**
   * The search index containing the merged data.
   */
  searchIndex: SearchIndex;
  /**
   * Indicates whether the search index is still loading.
   */
  isLoading: boolean;
}

/**
 * Custom hook for searching content within a Jaen website.
 * @returns The search index and loading status.
 */
export const useSearch = (): UseSearchResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchIndex, setSearchIndex] = useState<SearchIndex>({});
  const builtSearchIndexRef = useRef<SearchIndex | null>(null); // Ref to cache builtSearchIndex

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
      if (builtSearchIndexRef.current) {
        // Use the cached builtSearchIndex if available
        setSearchIndex(builtSearchIndexRef.current);
      } else {
        const builtSearchIndex = await getBuiltSearchIndex();

        console.log('builtSearchIndex', builtSearchIndex);

        if (builtSearchIndex) {
          builtSearchIndexRef.current = builtSearchIndex; // Cache the builtSearchIndex
        }
      }

      const pageValuesWithId = Object.entries(pages).map(([pageId, value]) => {
        const dynamicPagePath = Object.entries(dynamicPaths).find(
          ([_, node]) => node.jaenPageId === pageId
        )?.[0];

        const builtPagePath = Object.entries(
          builtSearchIndexRef.current || {}
        ).find(([_, node]) => node.id === pageId)?.[0];

        const title =
          value?.jaenPageMetadata?.title ||
          (builtPagePath
            ? builtSearchIndexRef.current?.[builtPagePath]?.title
            : undefined);

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
      const merged = mergeSearchIndex(
        builtSearchIndexRef.current || {},
        pageSearchIndex
      );

      setSearchIndex(merged);
      setIsLoading(false);
    };

    void loadSearchIndex();
  }, [pages, dynamicPaths]);

  return {
    searchIndex,
    isLoading
  };
};
