'use client';

import { useState } from 'react';
import { RiDeleteBin6Line, RiEdit2Line } from '@remixicon/react';
import { useRouter, useSearchParams } from 'next/navigation';

import { CreateCategory } from '@/features/create-category';
import { DeleteCategoryConfirmation } from '@/features/delete-category';
import { EditCategory } from '@/features/edit-category';
import { setId, useCategories } from '@/shared';
import { Button, Section, Typography } from '@/shared/ui';

export const CategoriesTable = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useCategories();

  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSetId = (id: number) =>
    router.push(`?${setId(String(id), searchParams)}`, { scroll: false });

  const handleOnEdit = (id: number) => {
    setIsEditModalActive(true);

    handleSetId(id);
  };

  const handleOnDelete = (id: number) => {
    setIsDeleteModalActive(true);

    handleSetId(id);
  };

  const content = isLoading ? (
    <tr className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <td>
        <Typography variant="h5" color="grey">
          isLoading
        </Typography>
      </td>
    </tr>
  ) : !data?.results ? (
    <tr className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <td>
        <Typography variant="h5" color="grey">
          No data available
        </Typography>
      </td>
    </tr>
  ) : (
    data?.results.map(category => {
      return (
        <tr
          key={category.id}
          className="group cursor-pointer border-b border-t border-theme-grey-200 bg-theme-white last:border-none hover:bg-theme-grey-100"
        >
          <td data-cell="id" className="whitespace-nowrap p-[14px] text-center">
            <Typography variant="caption" color="grey">
              {category.id}
            </Typography>
          </td>
          <td
            data-cell="name"
            className="flex flex-col whitespace-nowrap p-[14px]"
          >
            <Typography
              variant="caption"
              color="grey"
              weight="semibold"
              className="group-hover:text-theme-blue-300"
            >
              {category.name}
            </Typography>
          </td>
          <td>
            <Button
              variant="ghost"
              btnType="icon"
              onClick={() => handleOnEdit(category.id)}
            >
              <RiEdit2Line />
            </Button>
          </td>
          <td>
            <Button
              variant="ghost"
              btnType="icon"
              onClick={() => handleOnDelete(category.id)}
            >
              <RiDeleteBin6Line className="hover:fill-red-500" />
            </Button>
          </td>
        </tr>
      );
    })
  );

  return (
    <>
      <CreateCategory />
      <EditCategory
        isActive={isEditModalActive}
        setModalState={setIsEditModalActive}
      />
      <DeleteCategoryConfirmation
        isActive={isDeleteModalActive}
        setModalState={setIsDeleteModalActive}
      />
      <Section>
        <div className="relative overflow-x-auto rounded-lg border border-theme-grey-200">
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr className="bg-theme-grey-150">
                <th className="min-w-[76px] p-[14px]">
                  <Typography variant="caption" color="grey" weight="medium">
                    ID
                  </Typography>
                </th>
                <th className="min-w-[400px] p-[14px] text-left">
                  <Typography variant="caption" color="grey" weight="medium">
                    Name
                  </Typography>
                </th>
              </tr>
            </thead>

            <tbody>{content}</tbody>
          </table>
        </div>

        {/* {data ? ( //NOTE - 
          <Pagination
            pages={1}
            currentPage={currentPage}
            onPageChange={page => setCurrentPage(page)}
          />
        ) : null} */}
      </Section>
    </>
  );
};
