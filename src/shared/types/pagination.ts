
/**
 * Page info for pagination
 */
export type TPaginationPageInfo = {
    prevCursor?: string;
    hasPreviousPage?: boolean;
    nextCursor?: string;
    hasNextPage?: boolean;
}

/**
 * Data for pagination logic
 */
export type TPaginationData<I, T = {}> = T & {
    items: I;
    hasMore?: boolean;
    prevCursor?: string;
    nextCursor?: string;
    totalCount: number;
}