'use client';

import clsx from 'clsx';
import Link from 'next/link';

import {
  AddSubscriptionPlan,
  SubscriptionPlan,
} from '@/entities/subscription-plan';
import {
  Section,
  SUBSCRIPTION_ACTIVE_PATH,
  SUBSCRIPTION_ARCHIVE_PATH,
  Typography,
  useComparePath,
  useGetActivePlans,
} from '@/shared';

export const SubscriptionList = () => {
  const { data } = useGetActivePlans({ page: 1, limit: 5 });

  const isActivePlan = useComparePath(SUBSCRIPTION_ACTIVE_PATH);
  const isArchivePlan = useComparePath(SUBSCRIPTION_ARCHIVE_PATH);

  return (
    <Section>
      <div>
        <nav className="relative z-10 -mb-px flex border-b bg-theme-white">
          <Link
            href={SUBSCRIPTION_ACTIVE_PATH}
            className={clsx('cursor-pointer bg-theme-white px-4 py-5', {
              ['-mb-px rounded-md rounded-bl-none rounded-br-none border border-b-0']:
                isActivePlan,
              ['hover:text-theme-blue-300']: !isActivePlan,
            })}
          >
            <Typography
              variant="paragraph"
              className={clsx({
                ['font-medium']: isActivePlan,
              })}
            >
              Active plans
            </Typography>
          </Link>

          <Link
            href={SUBSCRIPTION_ARCHIVE_PATH}
            className={clsx('cursor-pointer bg-theme-white px-4 py-5', {
              ['-mb-px rounded-md rounded-bl-none rounded-br-none border border-b-0 font-bold']:
                isArchivePlan,
              ['hover:text-theme-blue-300']: !isArchivePlan,
            })}
          >
            <Typography
              variant="paragraph"
              className={clsx({
                ['font-medium']: isArchivePlan,
              })}
            >
              Archive plans
            </Typography>
          </Link>
        </nav>

        <div className="grid gap-6 overflow-hidden rounded-md rounded-tl-none rounded-tr-none border border-t-0 px-8 py-14 auto-fill-80">
          {data?.results?.map(item => {
            return (
              <SubscriptionPlan
                isExceeded={data.isExceeded}
                plan={item}
                key={item.id}
              />
            );
          })}
          {isActivePlan ? (
            <AddSubscriptionPlan isExceeded={data.isExceeded} />
          ) : null}
        </div>
      </div>
    </Section>
  );
};
