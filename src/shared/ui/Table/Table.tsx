import clsx from 'clsx';

import { Pagination } from '../Pagination';
import { Typography } from '../Typography';

import { TableProps } from './types/Table.types';

export const Table = <T extends { id: string | number }>({
  columns,
  data,
  currentPage,
  pages,
  onChange,
}: TableProps<T>) => {
  return (
    <div className="overflow-hidden rounded-lg border border-theme-grey-200">
      <div className="relative overflow-x-auto">
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
                  className="group cursor-pointer border-t border-theme-grey-200 bg-theme-white hover:bg-theme-grey-100"
                >
                  {columns.map(header => {
                    return (
                      <td
                        key={header.key}
                        className={clsx(
                          'relative whitespace-nowrap p-[14px] first:text-center',
                          {
                            ['!py-0 pl-[14px] pr-0']: header.key === 'actions',
                          },
                        )}
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

      {currentPage && pages && onChange ? (
        <Pagination
          currentPage={currentPage}
          pages={pages}
          onChange={onChange}
        />
      ) : null}
    </div>
  );
};
