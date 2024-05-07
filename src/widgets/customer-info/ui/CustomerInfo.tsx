'use client';

import { RiCalendar2Line } from '@remixicon/react';

import { useGetUser } from '@/shared/services/hooks/useGetUser';
import { Section, Typography } from '@/shared/ui';

export const CustomerInfo = ({ id }: { id: number }) => {
  const { user } = useGetUser(id);

  return (
    <Section>
      <div className="divide-y border border-theme-grey-200 bg-theme-white sm:text-center">
        <div className="p-8">
          <div className="inline-flex items-center sm:flex-col sm:space-y-3">
            <div className="flex">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-theme-grey-300">
                <Typography variant="h3" weight="medium">
                  {user?.firstName.slice(0, 1)}
                </Typography>
              </div>
            </div>

            <div className="ml-5 sm:ml-0">
              <Typography variant="h3" weight="medium">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="paragraph" color="grey">
                {user?.email}
              </Typography>
            </div>
          </div>
        </div>

        <div className="flex divide-x sm:flex-col sm:divide-y">
          <div className="flex flex-1 justify-center p-4">
            <div className="flex gap-3">
              <RiCalendar2Line />

              <div className="flex gap-1">
                <Typography variant="paragraph" weight="medium">
                  Joined:
                </Typography>
                <Typography variant="paragraph" color="grey">
                  {user?.joinedAt}
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-center p-4">
            <div className="flex gap-3">
              <RiCalendar2Line />

              <div className="flex gap-1">
                <Typography variant="paragraph" weight="medium">
                  Age:
                </Typography>
                <Typography variant="paragraph" color="grey">
                  {user?.age}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
