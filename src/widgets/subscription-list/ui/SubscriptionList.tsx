'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SubscriptionPlan } from '@/entities/subscription-plan';
import { AddSubscriptionPlan } from '@/features/add-subscription-plan';
import {
  ADMIN_SUBSCRIPTION_ACTIVE_PATH,
  ADMIN_SUBSCRIPTION_ARCHIEVE_PATH,
  Section,
  Typography,
} from '@/shared';

export const SubscriptionList = () => {
  const pathname = usePathname();

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

        <div className="grid gap-6 rounded-md rounded-tl-none rounded-tr-none border border-t-0 px-8 py-14 auto-fill-80">
          {Array.from({ length: 2 }).map((_, index) => {
            return <SubscriptionPlan key={index} />;
          })}
          <AddSubscriptionPlan />
        </div>
      </div>
    </Section>
  );
};
