'use client';

import { useRouter } from 'next/navigation';

import { useAdminPartners } from '@/shared/services/hooks/useAdminPartners';
import { Section, Typography } from '@/shared/ui';

export const AdminPartnersTable = () => {
  const router = useRouter();
  const { partners, isLoading } = useAdminPartners();

  const content = isLoading ? (
    <tr className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <td>
        <Typography variant="h5" color="grey">
          isLoading
        </Typography>
      </td>
    </tr>
  ) : !partners ? (
    <tr className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <td>
        <Typography variant="h5" color="grey">
          No data availabe
        </Typography>
      </td>
    </tr>
  ) : (
    partners?.results.map(user => {
      return (
        <tr
          key={user.id}
          className="group cursor-pointer border-b border-t border-theme-grey-200 bg-theme-white last:border-none hover:bg-theme-grey-100"
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
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="caption" color="grey">
              {user.email}
            </Typography>
          </td>
          <td data-cell="phone" className="whitespace-nowrap p-[14px]">
            {/* FIX_ME: Get phone number */}
            <Typography variant="caption" color="grey">
              +996-000-0000
            </Typography>
          </td>
        </tr>
      );
    })
  );

  return (
    <Section>
      {/* <SearchFilter
        onSearch={search => setSearch(search)}
        searchPlaceholder="Search by name or email"
      /> */}

      <div className="relative overflow-x-auto rounded-lg border border-theme-grey-200">
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

          <tbody>{content}</tbody>
        </table>
      </div>

      {/* {users ? (
        <Pagination
          currentPage={currentPage}
          totalCount={users.length}
          limit={10}
          onPageChange={page => setCurrentPage(page)}
        />
      ) : null} */}
    </Section>
  );
};
