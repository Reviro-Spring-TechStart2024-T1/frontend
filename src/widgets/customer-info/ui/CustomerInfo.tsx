'use client';

import { RiCalendar2Line } from '@remixicon/react';

import { useGetUser } from '@/shared/services/hooks/useGetUser';
import { Section, Typography } from '@/shared/ui';

export const CustomerInfo = ({ id }: { id: number }) => {
  const { user } = useGetUser(id);

  return (
    <Section>
      <div className="flex flex-col justify-between rounded-md border border-gray-300 bg-theme-white">
        <div className="m-8 flex">
          {/* FIX_ME: Show user if the ava is available */}
          {/* <Image src="/user.png" width={100} height={100} alt="user" /> */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-theme-grey-400">
            <Typography variant="h3">{user?.firstName.slice(0, 1)}</Typography>
          </div>
          <div className="py-4 pl-5">
            <Typography variant="h3">{user?.firstName}</Typography>
            <Typography
              variant="paragraph"
              className="text-[#3c3c3c] opacity-80"
            >
              {user?.email}
            </Typography>
          </div>
        </div>
        <div className="flex h-[54px] divide-x border-t border-gray-300">
          <div className="flex h-full w-2/4 items-center justify-center border-r border-gray-300">
            <RiCalendar2Line />
            <div className="ml-2.5 flex gap-1">
              <Typography variant="paragraph" weight="medium">
                Joined:
              </Typography>
              <Typography variant="paragraph" className="text-[#3c3c3c]">
                {user?.joinedAt}
              </Typography>
            </div>
          </div>
          <div className="flex w-2/4 items-center justify-center">
            <RiCalendar2Line />
            <div className="ml-2.5 flex gap-1">
              <Typography variant="paragraph" weight="medium">
                Age:
              </Typography>
              <Typography variant="paragraph" className="text-[#3c3c3c]">
                {user?.age}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
