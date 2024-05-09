import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import clsx from 'clsx';

import { usePagination } from '@/shared/helper';

import { Button } from '../Button';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  limit: number;
  siblingCount?: number;
  onPageChange: (value: number) => void;
}

export const Pagination = ({
  currentPage,
  totalCount,
  limit,
  siblingCount = 1,
  onPageChange,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    limit,
    siblingCount,
  });

  const lastPage =
    paginationRange && paginationRange[paginationRange?.length - 1];

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  if (currentPage === 0 || (paginationRange && paginationRange?.length < 2)) {
    return null;
  }

  return (
    <div>
      <ul className="flex justify-center gap-2">
        <li>
          <Button
            btnType="icon"
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={onPrevious}
          >
            <RiArrowLeftSLine />
          </Button>
        </li>

        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === 'DOTS') {
            return <li key={index}>&#8230;</li>;
          }

          return (
            <li key={index}>
              <Button
                btnType="icon"
                variant="primary"
                size="sm"
                className={clsx(
                  'bg-transparent text-theme-black hover:text-theme-white',
                  {
                    ['bg-theme-primary-300 text-theme-white']:
                      pageNumber === currentPage,
                  },
                )}
                onClick={() => onPageChange(pageNumber as number)}
              >
                {pageNumber}
              </Button>
            </li>
          );
        })}
        <li>
          <Button
            btnType="icon"
            variant="outline"
            size="sm"
            disabled={currentPage === lastPage}
            onClick={onNext}
          >
            <RiArrowRightSLine />
          </Button>
        </li>
      </ul>
    </div>
  );
};
