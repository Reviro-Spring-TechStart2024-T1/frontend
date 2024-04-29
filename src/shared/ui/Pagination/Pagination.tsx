import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import clsx from 'clsx';

import { usePagination } from '@/shared/helper';

import { Button } from '../Button';

interface PaginationProps {
  onPageChange: (value: number) => void;
  pages: number;
  siblingCount?: number;
  currentPage: number;
}

export const Pagination = ({
  onPageChange,
  pages,
  currentPage,
  siblingCount = 1,
}: PaginationProps) => {
  const paginationRange = usePagination({
    pages,
    currentPage,
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
  return (
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
  );
};
