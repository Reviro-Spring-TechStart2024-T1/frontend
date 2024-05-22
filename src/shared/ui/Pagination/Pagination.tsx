import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiMoreLine,
} from '@remixicon/react';
import clsx from 'clsx';

import { usePagination } from '@/shared/helper';

import { Button } from '../Button';

interface PaginationProps {
  currentPage: number;
  pages: number;
  siblingCount?: number;
  onChange: (value: number) => void;
}

export const Pagination = ({
  currentPage,
  pages,
  siblingCount = 1,
  onChange,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    pages,
    siblingCount,
  });

  const lastPage =
    paginationRange && paginationRange[paginationRange?.length - 1];

  const onNext = () => {
    onChange(currentPage + 1);
  };

  const onPrevious = () => {
    onChange(currentPage - 1);
  };

  if (currentPage === 0 || (paginationRange && paginationRange?.length < 2)) {
    return null;
  }

  return (
    <div className="border-t p-6">
      <ul className="flex justify-end gap-2">
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

        <div className="flex gap-2 sm:hidden">
          {paginationRange?.map((pageNumber, index) => {
            if (pageNumber === 'DOTS') {
              return (
                <li
                  key={index}
                  className="flex w-8 items-center justify-center"
                >
                  <RiMoreLine size={20} />
                </li>
              );
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
                        (pageNumber as number) === currentPage,
                    },
                  )}
                  onClick={() => onChange(pageNumber as number)}
                >
                  {pageNumber}
                </Button>
              </li>
            );
          })}
        </div>

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
