'use client';

import { Suspense, useState } from 'react';
import { ReadonlyURLSearchParams, useRouter } from 'next/navigation';

import { TCategory } from '@/entities/category';
import { EditCategory } from '@/features';
import { CreateCategory } from '@/features/create-category';
import { DeleteCategoryConfirmation } from '@/features/delete-category';
import { setId, useCategories } from '@/shared';
import { Container } from '@/shared/ui';
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
            onEdit={() => handleOnEdit(record.id)}
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

  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);

  const router = useRouter();

  const handleSetId = (id: number) =>
    router.push(`?${setId(String(id), searchParams)}`, { scroll: false });

  const handleOnEdit = (id: number) => {
    setIsEditModalActive(true);

    handleSetId(id);
    setShow(0);
  };

  const handleOnDelete = (id: number) => {
    setIsDeleteModalActive(true);

    handleSetId(id);
    setShow(0);
  };

  return (
    <Suspense fallback="Loading...">
      <EditCategory
        isActive={isEditModalActive}
        setModalState={setIsEditModalActive}
      />
      <DeleteCategoryConfirmation
        isActive={isDeleteModalActive}
        setModalState={setIsDeleteModalActive}
      />
      <Container title="Categories">
        <CreateCategory />
        <Table<TCategory>
          columns={columns}
          data={data?.results}
          currentPage={currentPage}
          pages={data.pages}
          loading={isLoading}
          onChange={offset => setCurrentPage(offset)}
        />
      </Container>
    </Suspense>
  );
}
