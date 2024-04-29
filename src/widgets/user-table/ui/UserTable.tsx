'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { useUsers } from '@/shared';
import { Typography } from '@/shared/ui';
import { Pagination } from '@/shared/ui/Pagination/Pagination';

export const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { users, isLoading } = useUsers(currentPage);

  const data = isLoading ? (
    <tr className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <td>
        <Typography variant="h5" color="grey">
          isLoading
        </Typography>
      </td>
    </tr>
  ) : !users?.data ? (
    <tr className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <td>
        <Typography variant="h5" color="grey">
          No data availabe
        </Typography>
      </td>
    </tr>
  ) : (
    users?.data.map((user, index) => {
      return (
        <tr
          className={clsx(
            'group divide-x-2 border-b-2 border-t-2 border-theme-grey-200 bg-theme-white hover:bg-theme-grey-100',
            { ['border-none']: index === 9 },
          )}
          key={user.id}
        >
          <td data-cell="id" className="whitespace-nowrap p-[14px] text-center">
            <Typography variant="caption" color="grey" weight="medium">
              {user.id}
            </Typography>
          </td>
          <td data-cell="name" className="whitespace-nowrap p-[14px]">
            <Link href={`/partner/customer/${user.id}`}>
              <Typography
                variant="caption"
                color="grey"
                weight="medium"
                className="cursor-pointer hover:underline group-hover:text-theme-blue-300"
              >
                {user.firstName}
              </Typography>
            </Link>
          </td>
          <td data-cell="email" className="whitespace-nowrap p-[14px]">
            <Typography variant="caption" color="grey" weight="medium">
              {user.email}
            </Typography>
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
            <tr className="divide-x-2 bg-theme-grey-150">
              <th className="min-w-[76px] p-[14px]">
                <Typography variant="caption" color="grey" weight="medium">
                  ID
                </Typography>
              </th>
              <th className="min-w-[400px] p-[14px] text-left">
                <Typography variant="caption" color="grey" weight="medium">
                  Name
                </Typography>
              </th>
              <th className="min-w-[400px] p-[14px] text-left">
                <Typography variant="caption" color="grey" weight="medium">
                  Email
                </Typography>
              </th>
            </tr>
          </thead>

          <tbody>{data}</tbody>
        </table>
      </div>

      {users ? (
        <Pagination
          pages={users.pages}
          currentPage={currentPage}
          onPageChange={page => setCurrentPage(page)}
        />
      ) : null}
    </div>
  );
};
