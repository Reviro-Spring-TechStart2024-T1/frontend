'use client';

import { useState } from 'react';
import { ReadonlyURLSearchParams, useRouter } from 'next/navigation';

import { TCategory } from '@/entities/category';
import { setId, useCategories, useModal } from '@/shared';
import { Button, Container } from '@/shared/ui';
import { ColumnsType, Table } from '@/shared/ui/Table';
import { MoreModal } from '@/widgets/more-modal';

export default function AdminMenuPage({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  const [show, setShow] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useCategories({ page: currentPage, limit: 10 });
  const { onOpen } = useModal();

  const columns: ColumnsType<TCategory> = [
    { key: 'id', title: '№' },
    { key: 'name', title: 'Beverage' },
    {
      key: 'actions',
      title: '',
      width: 'w-20',
      render: record => {
        return (
          <MoreModal
            id={record.id}
            show={show}
            onShow={id => handleMoreModal(id)}
            onEdit={() => handleOnEdit(record.id, record.name)}
            onDelete={() => handleOnDelete(record.id)}
          />
        );
      },
    },
  ];

  const handleMoreModal = (id: number) => {
    if (id === show) return setShow(0);

    setShow(id);
  };

  const router = useRouter();

  const handleSetId = (id: number) =>
    router.push(`?${setId(String(id), searchParams)}`, { scroll: false });

  const handleOnEdit = (id: number, name: string) => {
    onOpen('editCategory', { id: id, title: name });

    handleSetId(id);
    setShow(0);
  };

  const handleOnDelete = (id: number) => {
    onOpen('deleteCategory', { id: id });

    handleSetId(id);
    setShow(0);
  };

  return (
    <Container title="Categories">
      <div className="flex justify-end">
        <Button onClick={() => onOpen('createCategory')}>
          Create category
        </Button>
      </div>
      <Table<TCategory>
        columns={columns}
        data={data?.results}
        currentPage={currentPage}
        pages={data.pages}
        loading={isLoading}
        onChange={offset => setCurrentPage(offset)}
      />
    </Container>
  );
}
