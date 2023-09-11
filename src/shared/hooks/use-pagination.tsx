import { useState } from 'react';

interface IUsePaginationProps {
  itemsPerPage: number;
  totalItems: number;
  maxItems?: number;
}

interface IUsePaginationReturn {
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  totalPages: number;
}

/**
 * Hook to handle pagination
 */
const usePagination = ({
  itemsPerPage,
  totalItems,
  maxItems = totalItems
}: IUsePaginationProps): IUsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  /**
   * Increments the current page by 1 if the current page is less than the total pages
   */
  const nextPage = () => {
    if (currentPage < totalPages && currentPage < maxItems / itemsPerPage) {
      setCurrentPage(page => page + 1);
    }
  };

  /**
   * Decrements the current page by 1 if the current page is greater than 1
   */
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(page => page - 1);
    }
  };

  return {
    itemsPerPage,
    currentPage,
    setCurrentPage,
    nextPage,
    previousPage,
    totalPages
  };
};

export default usePagination;
