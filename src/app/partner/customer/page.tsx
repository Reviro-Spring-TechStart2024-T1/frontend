import { Metadata } from 'next';

import { Typography } from '@/shared/ui';

export const metadata: Metadata = {
  title: 'Customer Data',
};

export default function Customer() {
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
          <tr className="divide-x-2 border-t-2 border-theme-grey-200 bg-theme-white hover:bg-theme-grey-100">
            <td
              data-cell="id"
              className="whitespace-nowrap p-[14px] text-center"
            >
              <Typography variant="caption" color="grey" weight="medium">
                1
              </Typography>
            </td>
            <td data-cell="name" className="whitespace-nowrap p-[14px]">
              <Typography variant="caption" color="grey" weight="medium">
                Aktan
              </Typography>
            </td>
            <td data-cell="email" className="whitespace-nowrap p-[14px]">
              <Typography variant="caption" color="grey" weight="medium">
                aktanmoldokeev@gmail.com
              </Typography>
            </td>
          </tr>
          <tr className="divide-x-2 border-t-2 border-theme-grey-200 bg-theme-white hover:bg-theme-grey-100">
            <td
              data-cell="id"
              className="whitespace-nowrap p-[14px] text-center"
            >
              <Typography variant="caption" color="grey" weight="medium">
                1
              </Typography>
            </td>
            <td data-cell="name" className="whitespace-nowrap p-[14px]">
              <Typography variant="caption" color="grey" weight="medium">
                Aktan
              </Typography>
            </td>
            <td data-cell="email" className="whitespace-nowrap p-[14px]">
              <Typography variant="caption" color="grey" weight="medium">
                aktanmoldokeev@gmail.com
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
