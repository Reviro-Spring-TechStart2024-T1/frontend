'use client';

import { useParams } from 'next/navigation';

import { OrderHistoryResponse } from '@/shared';
import { useGetCustomer } from '@/shared/services/hooks/useGetCustomer';
import { Section } from '@/shared/ui';
import { Container } from '@/shared/ui/Container/Container';
import { ColumnsType, Table } from '@/shared/ui/Table';
import { CustomerInfo } from '@/widgets/customer-info';

export default function CustomerProfile() {
  const params = useParams<{ id: string }>();
  const { customer } = useGetCustomer(params.id);

  const columns: ColumnsType<OrderHistoryResponse> = [
    { key: 'id', title: '№' },
    { key: 'beverage_name', title: 'Beverage' },
    { key: 'price', title: 'Price' },
    { key: 'order_date', title: 'Creation time' },
  ];

  return (
    <Container title="Customer Profile">
      <CustomerInfo customer={customer} />

      <Section title="Order history">
        <Table<OrderHistoryResponse>
          columns={columns}
          data={customer?.orders}
        />
      </Section>
    </Container>
  );
}
