import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared';
import { OrderForClient } from '@/widgets/order-for-client';

export const metadata: Metadata = {
  title: `Order in client's stead`,
  ...NO_INDEX_PAGE,
};

export default function Page({
  searchParams,
}: {
  searchParams: { bev_id: string; customer_id: string };
}) {
  return (
    <OrderForClient
      bev_id={searchParams.bev_id}
      customer_id={searchParams.customer_id}
    />
  );
}
