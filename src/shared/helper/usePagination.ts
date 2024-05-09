import { useMemo } from 'react';

interface usePaginationProps {
  currentPage: number;
  totalCount: number;
  limit: number;
  siblingCount: number;
}

export const usePagination = ({
  currentPage,
  totalCount,
  limit,
  siblingCount,
}: usePaginationProps) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    const pages = Math.ceil(totalCount / limit);

    /* Case 1 */
    if (totalPageNumbers >= pages) {
      return range(1, pages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, pages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < pages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = pages;

    /* Case 2 */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, 'DOTS', pages];
    }

    /* Case 3 */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(pages - rightItemCount + 1, pages);
      return [firstPageIndex, 'DOTS', ...rightRange];
    }

    /* Case 4 */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
    }
  }, [totalCount, limit, siblingCount, currentPage]);

  return paginationRange;
};
