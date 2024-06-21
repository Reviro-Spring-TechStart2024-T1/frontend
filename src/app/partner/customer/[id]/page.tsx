'use client';

import { useParams } from 'next/navigation';

import { dateToDayHour, OrderHistory, useGetCustomer } from '@/shared';
import { Section, Typography } from '@/shared/ui';
import { Container } from '@/shared/ui/Container/Container';
import { ColumnsType, Table } from '@/shared/ui/Table';
import { CustomerInfo } from '@/widgets/customer-info';

export default function CustomerProfile() {
  const params = useParams<{ id: string }>();
  const { customer, isLoading } = useGetCustomer({ id: params.id });

  const columns: ColumnsType<OrderHistory> = [
    { key: 'id', title: '№' },
    { key: 'beverage_name', title: 'Beverage' },
    { key: 'price', title: 'Price' },
    {
      key: 'order_date',
      title: 'Order date',
      render: record => {
        return (
          <Typography variant="caption" color="grey">
            {dateToDayHour(record.order_date)}
          </Typography>
        );
      },
    },
  ];

  return (
    <Container title="Customer Profile">
      <CustomerInfo {...customer} />

      <Section title="Order history">
        <Table<OrderHistory>
          columns={columns}
          data={customer?.orders}
          loading={isLoading}
        />
      </Section>
    </Container>
  );
}
