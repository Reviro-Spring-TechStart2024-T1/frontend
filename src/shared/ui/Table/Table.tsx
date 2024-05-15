import clsx from 'clsx';

import { Typography } from '../Typography';

import { TableProps } from './types/Table.types';

export const Table = <T extends { id: string | number }>({
  columns,
  data,
}: TableProps<T>) => {
  return (
    <>
      <div className="relative overflow-x-auto rounded-lg border border-theme-grey-200">
        <table className="w-full">
          <thead className="bg-theme-grey-150">
            <tr>
              {columns.map(header => {
                return (
                  <th
                    key={header.key}
                    className={clsx(
                      'p-[14px] text-left first:w-20 first:text-center',
                      header.width,
                    )}
                  >
                    <Typography variant="caption" color="grey" weight="medium">
                      {header.title}
                    </Typography>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {data?.map(item => {
              return (
                <tr
                  key={item.id}
                  className="group cursor-pointer border-b border-t border-theme-grey-200 bg-theme-white hover:bg-theme-grey-100"
                >
                  {columns.map(header => {
                    return (
                      <td
                        key={header.key}
                        className="relative whitespace-nowrap p-[14px] first:text-center"
                      >
                        {header.render ? (
                          header.render(item)
                        ) : (
                          <Typography variant="caption" color="grey">
                            {(item as any)[header.key]}
                          </Typography>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* {data ? (
        <Pagination
          currentPage={currentPage}
          totalCount={order_history.length}
          limit={10}
          onPageChange={page => setCurrentPage(page)}
        />
      ) : null} */}
    </>
  );
};
