'use client';

import { useParams } from 'next/navigation';

import { OrderHistoryResponse, useOrderHistory } from '@/shared';
import { Section } from '@/shared/ui';
import { Container } from '@/shared/ui/Container/Container';
import { ColumnsType, Table } from '@/shared/ui/Table';
import { CustomerInfo } from '@/widgets/customer-info';

export default function CustomerProfile() {
  const params = useParams<{ id: string }>();
  const { order_history } = useOrderHistory(1);

  const columns: ColumnsType<OrderHistoryResponse> = [
    { key: 'id', title: '№' },
    { key: 'beverage', title: 'Beverage' },
    { key: 'price', title: 'Price' },
    { key: 'category', title: 'Category' },
    { key: 'creation_time', title: 'Creation time' },
  ];

  return (
    <Container title="Customer Profile">
      <CustomerInfo id={params.id} />

      <Section title="Order history">
        <Table<OrderHistoryResponse> columns={columns} data={order_history} />
      </Section>
    </Container>
  );
}
