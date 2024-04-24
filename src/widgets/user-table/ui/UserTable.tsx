'use client';

import Link from 'next/link';

import { useUsers } from '@/shared';
import { Typography } from '@/shared/ui';

export const UserTable = () => {
  const { users } = useUsers();

  return (
    <div className="overflow-auto rounded-lg border-2 border-theme-grey-200">
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

        <tbody>
          {users?.map((user, index) => {
            return (
              <tr
                className="group divide-x-2 border-t-2 border-theme-grey-200 bg-theme-white hover:bg-theme-grey-100"
                key={index}
              >
                <td
                  data-cell="id"
                  className="whitespace-nowrap p-[14px] text-center"
                >
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
                      className="group-hover:text-theme-blue-300 cursor-pointer hover:underline"
                    >
                      {user.name}
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
          })}
        </tbody>
      </table>
    </div>
  );
};
