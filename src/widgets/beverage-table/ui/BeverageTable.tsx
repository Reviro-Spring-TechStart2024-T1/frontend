'use client';

import { useState } from 'react';
import { RiDeleteBinLine, RiEditLine } from '@remixicon/react';
import clsx from 'clsx';

import { useOrderHistory } from '@/shared/api/hooks/useOrderHistory';
import { Typography } from '@/shared/ui';
import { Pagination } from '@/shared/ui/Pagination/Pagination';

export const BeverageTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { order_history, isLoading } = useOrderHistory(currentPage);

  const data = isLoading ? (
    <tr className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <td>
        <Typography variant="h5" color="grey">
          isLoading
        </Typography>
      </td>
    </tr>
  ) : !order_history?.data ? (
    <tr className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <td>
        <Typography variant="h5" color="grey">
          No data availabe
        </Typography>
      </td>
    </tr>
  ) : (
    order_history?.data.map((order, index) => {
      return (
        <tr
          className={clsx(
            'border-b-2 border-t-2 border-theme-grey-200 bg-theme-white hover:bg-theme-grey-100',
            { ['border-none']: index === 9 },
          )}
          key={order.id}
        >
          <td data-cell="id" className="whitespace-nowrap p-[14px] text-center">
            <Typography variant="caption" color="grey" weight="medium">
              {order.id}
            </Typography>
          </td>
          <td data-cell="beverage" className="whitespace-nowrap p-[14px]">
            <Typography variant="caption" color="grey" weight="medium">
              {order.beverage}
            </Typography>
          </td>
          <td data-cell="price" className="whitespace-nowrap p-[14px]">
            <Typography variant="caption" color="grey" weight="medium">
              {order.price}
            </Typography>
          </td>
          <td data-cell="category" className="whitespace-nowrap p-[14px]">
            <Typography variant="caption" color="grey" weight="medium">
              {order.category}
            </Typography>
          </td>
          <td data-cell="creation time" className="whitespace-nowrap p-[14px]">
            <Typography variant="caption" color="grey" weight="medium">
              {order.creation_time}
            </Typography>
          </td>
          <td data-cell="action" className="whitespace-nowrap p-[14px]">
            <div className="flex justify-evenly">
              <RiEditLine className="cursor-pointer text-theme-blue-300" />

              <RiDeleteBinLine className="cursor-pointer text-theme-red-500" />
            </div>
          </td>
        </tr>
      );
    })
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="relative h-[596px] overflow-auto rounded-lg border-2 border-theme-grey-200">
        <table className="w-full">
          <thead>
            <tr className="bg-theme-grey-150">
              <th className="min-w-16 p-[14px]">
                <Typography variant="caption" color="grey" weight="medium">
                  ID
                </Typography>
              </th>
              <th className="min-w-[200px] p-[14px] text-left">
                <Typography variant="caption" color="grey" weight="medium">
                  Beverage
                </Typography>
              </th>
              <th className="min-w-[200px] p-[14px] text-left">
                <Typography variant="caption" color="grey" weight="medium">
                  Price
                </Typography>
              </th>
              <th className="min-w-[200px] p-[14px] text-left">
                <Typography variant="caption" color="grey" weight="medium">
                  Category
                </Typography>
              </th>
              <th className="min-w-[200px] p-[14px] text-left">
                <Typography variant="caption" color="grey" weight="medium">
                  Creation Time
                </Typography>
              </th>
              <th className="min-w-20 p-[14px]">
                <Typography variant="caption" color="grey" weight="medium">
                  Action
                </Typography>
              </th>
            </tr>
          </thead>

          <tbody>{data}</tbody>
        </table>
      </div>

      {order_history ? (
        <Pagination
          pages={order_history.pages}
          currentPage={currentPage}
          onPageChange={page => setCurrentPage(page)}
        />
      ) : null}
    </div>
  );
};
