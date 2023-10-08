export type TSearchMetadata = {
  _page_matches: number;
  _section_matches: number;
};

/**
 * The combined search results.
 */
export type TSearchResults = {
  docs: TSearchResultSection[];
  community: TSearchResultSection[];
}

/**
 * A single search result section.
 */
export type TSearchResultSection = {
  title: string;
  results: TSearchResult[];
};

/**
 * A single search result.
 */
export type TSearchResult = {
  title: string;
  description: string;
  href: string;
};

/**
 * The search index data.
 */
export type TSearchIndexData = {
  [key: string]: TSearchIndexDataEntry;
};
/**
 * A single entry in the search index.
 */
export type TSearchIndexDataEntry = {
  title: string;
  data: {
    [key: string]: string;
  };
};
