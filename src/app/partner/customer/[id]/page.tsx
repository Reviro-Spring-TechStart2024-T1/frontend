'use client';

import { useParams } from 'next/navigation';

import { dateToDayHour, OrderHistoryResponse } from '@/shared';
import { useGetCustomer } from '@/shared/services/hooks/useGetCustomer';
import { Section, Typography } from '@/shared/ui';
import { Container } from '@/shared/ui/Container/Container';
import { ColumnsType, Table } from '@/shared/ui/Table';
import { CustomerInfo } from '@/widgets/customer-info';

export default function CustomerProfile() {
  const params = useParams<{ id: string }>();
  const { customer, isLoading } = useGetCustomer(params.id);

  const columns: ColumnsType<OrderHistoryResponse> = [
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
      <CustomerInfo customer={customer} />

      <Section title="Order history">
        <Table<OrderHistoryResponse>
          columns={columns}
          data={customer?.orders}
          loading={isLoading}
        />
      </Section>
    </Container>
  );
}
