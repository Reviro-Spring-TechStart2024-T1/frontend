'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { useOrderHistory } from '@/shared/services/hooks/useOrderHistory';
import { Section, Typography } from '@/shared/ui';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { CustomerSearchFilter } from '@/widgets/customer-search-filter';
import { MoreModal } from '@/widgets/more-modal';

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
            'cursor-pointer border-b-2 border-t-2 border-theme-grey-200 bg-theme-white hover:bg-theme-grey-100',
            { ['border-none']: index === 9 },
          )}
          key={order.id}
        >
          <td data-cell="id" className="whitespace-nowrap p-[14px] text-center">
            <Typography variant="caption" color="grey">
              {order.id}
            </Typography>
          </td>
          <td data-cell="beverage" className="whitespace-nowrap p-[14px]">
            <Typography variant="caption" color="grey">
              {order.beverage}
            </Typography>
          </td>
          <td data-cell="price" className="whitespace-nowrap p-[14px]">
            <Typography variant="caption" color="grey">
              {order.price}
            </Typography>
          </td>
          <td data-cell="category" className="whitespace-nowrap p-[14px]">
            <Typography variant="caption" color="grey">
              {order.category}
            </Typography>
          </td>
          <td data-cell="creation_time" className="whitespace-nowrap p-[14px]">
            <Typography variant="caption" color="grey">
              {order.creation_time}
            </Typography>
          </td>
          <td
            data-cell="action"
            className="relative whitespace-nowrap pl-[14px]"
          >
            <MoreModal id={order.id} />
          </td>
        </tr>
      );
    })
  );

  return (
    <Section title="Order history">
      <CustomerSearchFilter />

      <div className="relative h-[530px] overflow-auto rounded-lg border-2 border-theme-grey-200">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
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
              <th className="min-w-10 p-[14px]"></th>
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
    </Section>
  );
};
