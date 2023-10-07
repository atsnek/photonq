import { useEffect, useState } from 'react';
import { TPaginationType } from '../types/pagination';

interface IUsePaginationProps<T> {
  items: T[];
  hasMoreItems?: boolean;
  itemsPerPage: number;
  maxItems?: number;
  type: TPaginationType;
}

interface IUsePaginationReturn<T> {
  currentItems: T[];
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  totalPages: number;
}

/**
 * Hook to handle pagination
 * @param items The items to paginate
 * @param itemsPerPage The amount of items per page
 * @param maxItems The maximum amount of items to paginate
 * @param type The type of pagination to use
 */
const usePagination = <T,>({
  items,
  hasMoreItems,
  itemsPerPage,
  maxItems,
  type = 'pages'
}: IUsePaginationProps<T>): IUsePaginationReturn<T> => {
  const usePages = type === 'pages' || type === 'async-pages';

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages =
    Math.ceil(items?.length / itemsPerPage) +
    (type === 'async-pages' && hasMoreItems ? 1 : 0);
  const currentItems = usePages
    ? items?.slice(
        currentPage * itemsPerPage - itemsPerPage,
        currentPage * itemsPerPage
      )
    : items;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [items]);

  /**
   * Increments the current page by 1 if the current page is less than the total pages
   */
  const nextPage = () => {
    if (
      (usePages &&
        currentPage < totalPages &&
        (!maxItems || currentPage < maxItems / itemsPerPage)) ||
      hasMoreItems
    ) {
      setCurrentPage(page => page + 1);
    }
  };

  /**
   * Decrements the current page by 1 if the current page is greater than 1
   */
  const previousPage = () => {
    if (currentPage > 1 && usePages) {
      setCurrentPage(page => page - 1);
    }
  };

  return {
    currentItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    nextPage,
    previousPage,
    totalPages
  };
};

export default usePagination;
