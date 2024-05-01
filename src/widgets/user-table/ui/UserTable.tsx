'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { useUsers } from '@/shared';
import { Section, Typography } from '@/shared/ui';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { CustomerSearchFilter } from '@/widgets/customer-search-filter';

export const UserTable = () => {
  const router = useRouter();
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
          key={user.id}
          className={clsx(
            'group cursor-pointer border-b-2 border-t-2 border-theme-grey-200 bg-theme-white hover:bg-theme-grey-100 ',
            { ['border-none']: index === 9 },
          )}
          onClick={() => router.push(`/partner/customer/${user.id}`)}
        >
          <td data-cell="id" className="whitespace-nowrap p-[14px] text-center">
            <Typography variant="caption" color="grey">
              {user.id}
            </Typography>
          </td>
          <td
            data-cell="name"
            className="flex flex-col whitespace-nowrap p-[14px]"
          >
            <Typography
              variant="caption"
              color="grey"
              weight="semibold"
              className="group-hover:text-theme-blue-300"
            >
              {user.firstName} LastName
            </Typography>
            <Typography variant="caption" color="grey">
              {user.email}
            </Typography>
          </td>
          <td data-cell="phone" className="whitespace-nowrap p-[14px]">
            <Typography variant="caption" color="grey">
              {user.phone}
            </Typography>
          </td>
        </tr>
      );
    })
  );

  return (
    <Section>
      <CustomerSearchFilter />

      <div className="relative h-[530px] overflow-auto rounded-lg border-2 border-theme-grey-200">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-theme-grey-150">
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
                  Phone
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
    </Section>
  );
};
