'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  AddSubscriptionPlan,
  SubscriptionPlan,
} from '@/entities/subscription-plan';
import {
  ADMIN_SUBSCRIPTION_ACTIVE_PATH,
  ADMIN_SUBSCRIPTION_ARCHIEVE_PATH,
  Section,
  Typography,
  useGetPlans,
} from '@/shared';

export const SubscriptionList = () => {
  const pathname = usePathname();
  const { data } = useGetPlans();

  return (
    <Section>
      <div>
        <nav className="relative z-10 -mb-px flex border-b bg-theme-white">
          <Link
            href={ADMIN_SUBSCRIPTION_ACTIVE_PATH}
            className={clsx('cursor-pointer bg-theme-white px-4 py-5', {
              ['-mb-px rounded-md rounded-bl-none rounded-br-none border border-b-0']:
                pathname === ADMIN_SUBSCRIPTION_ACTIVE_PATH,
              ['hover:text-theme-blue-300']:
                pathname !== ADMIN_SUBSCRIPTION_ACTIVE_PATH,
            })}
          >
            <Typography
              variant="paragraph"
              className={clsx({
                ['font-medium']: pathname === ADMIN_SUBSCRIPTION_ACTIVE_PATH,
              })}
            >
              Active plans
            </Typography>
          </Link>

          <Link
            href={ADMIN_SUBSCRIPTION_ARCHIEVE_PATH}
            className={clsx('cursor-pointer bg-theme-white px-4 py-5', {
              ['-mb-px rounded-md rounded-bl-none rounded-br-none border border-b-0 font-bold']:
                pathname === ADMIN_SUBSCRIPTION_ARCHIEVE_PATH,
              ['hover:text-theme-blue-300']:
                pathname !== ADMIN_SUBSCRIPTION_ARCHIEVE_PATH,
            })}
          >
            <Typography
              variant="paragraph"
              className={clsx({
                ['font-medium']: pathname === ADMIN_SUBSCRIPTION_ARCHIEVE_PATH,
              })}
            >
              Archieve plans
            </Typography>
          </Link>
        </nav>

        <div className="grid gap-6 overflow-hidden rounded-md rounded-tl-none rounded-tr-none border border-t-0 px-8 py-14 auto-fill-80">
          {data?.results.map(item => {
            return <SubscriptionPlan {...item} key={item.id} />;
          })}
          <AddSubscriptionPlan />
        </div>
      </div>
    </Section>
  );
};
