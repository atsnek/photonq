
/**
 * Page info for pagination
 */
export type TPaginationPageInfo = {
    cursor: string;
    hasNextPage: boolean;
}

/**
 * Data for pagination logic
 */
export type TPaginationData<I, T = {}> = T & {
    items: I;
    hasMore?: boolean;
    cursor?: string;
    totalCount: number;
}