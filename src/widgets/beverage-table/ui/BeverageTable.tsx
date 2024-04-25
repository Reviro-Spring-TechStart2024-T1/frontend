'use client';

import { RiDeleteBinLine, RiEditLine } from '@remixicon/react';

import { useOrderHistory } from '@/shared/hooks/useOrderHistory';
import { Typography } from '@/shared/ui';

export const BeverageTable = () => {
  const { order_history } = useOrderHistory();

  return (
    <div className="overflow-auto rounded-lg border-2 border-theme-grey-200">
      <table className="w-full">
        <thead>
          <tr className="divide-x-2 bg-theme-grey-150">
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
            <th className="min-w-20 p-[14px] text-left">
              <Typography variant="caption" color="grey" weight="medium">
                Action
              </Typography>
            </th>
          </tr>
        </thead>

        <tbody>
          {order_history?.map(order => {
            return (
              <tr
                className="divide-x-2 border-t-2 border-theme-grey-200 bg-theme-white hover:bg-theme-grey-100"
                key={order.id}
              >
                <td
                  data-cell="id"
                  className="whitespace-nowrap p-[14px] text-center"
                >
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
                <td
                  data-cell="creation time"
                  className="whitespace-nowrap p-[14px]"
                >
                  <Typography variant="caption" color="grey" weight="medium">
                    {order.creation_time}
                  </Typography>
                </td>
                <td data-cell="action" className="whitespace-nowrap p-[14px]">
                  <div className="flex justify-evenly">
                    <RiEditLine className="text-theme-blue-300 cursor-pointer" />

                    <RiDeleteBinLine className="cursor-pointer text-theme-red-500" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
