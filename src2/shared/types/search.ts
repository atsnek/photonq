import { ReactNode } from "react";

export type TSearchMetadata = {
  _page_matches: number;
  _section_matches: number;
};

/**
 * The combined search results.
 */
export type TSearchResults = Record<string, { title: string, sections: TSearchResultSection[], icon?: ReactNode }>;
// {
//   docs: TSearchResultSection[];
//   community: TSearchResultSection[];
//   users: TSearchResultSection[];
// }

/**
 * A single search result section.
 */
export type TSearchResultSection = {
  title: string;
  results: TSearchResult[];
  icon?: ReactNode;
  resultIcon?: ReactNode;
};

/**
 * A single search result.
 */
export type TSearchResult = {
  avatarURL?: string;
  title: string;
  description: string;
  href: string;
  isActive?: boolean;
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
