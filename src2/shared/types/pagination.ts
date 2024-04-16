import { TCommDataState } from "./comm";

/**
 * Page info for pagination
 */
export type TPaginationPageInfo = {
  prevCursor?: string;
  hasPreviousPage?: boolean;
  nextCursor?: string;
  hasNextPage?: boolean;
};

/**
 * Data for pagination logic
 */
export type TPaginationData<I, T = {}> = {
  items: I;
  itemsPerPage?: number;
  hasMore?: boolean;
  prevCursor?: string;
  nextCursor?: string;
  totalCount: number;
  state: TCommDataState;
};

/**
 * All possible pagination types
 * - pages: Classic pagination where all items are preloaded and the user can navigate between pages
 * - load-more: The user can load more items by clicking a button
 * - async-pages: The user can navigate between pages but new page items are loaded asynchronously
 */
export type TPaginationType = 'pages' | 'load-more' | 'async-pages';
