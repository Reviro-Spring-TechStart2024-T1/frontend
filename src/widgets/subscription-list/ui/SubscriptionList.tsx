import Link from 'next/link';

import { SubscriptionPlan } from '@/entities/subscription-plan';
import { AddSubscriptionPlan } from '@/features/add-subscription-plan';
import { Section, Typography } from '@/shared';

export const SubscriptionList = () => {
  return (
    <Section>
      <div>
        <nav className="relative z-10 -mb-px flex border-b bg-theme-white">
          <Link
            href="/admin/subscription/active_plans"
            className="-mb-px cursor-pointer rounded-md rounded-bl-none rounded-br-none border border-b-0 bg-theme-white px-4 py-5"
          >
            <Typography variant="paragraph">Active plans</Typography>
          </Link>

          <Link
            href="/admin/subscription/archieve_plans"
            className="cursor-pointer px-4 py-5"
          >
            <Typography variant="paragraph">Archieve plans</Typography>
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
