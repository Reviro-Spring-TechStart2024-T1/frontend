'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Categories, TCategory } from '@/entities/category';
import { FindCustomerForm, SubmitButton } from '@/features';
import {
  PARTNER_ORDERS_PATH,
  useCategories,
  useOrderForClient,
} from '@/shared';
import { Container, Input } from '@/shared/ui';
import { BeverageList } from '@/widgets/beverage-list';

export const OrderForClient: FC<{ bev_id: string; customer_id: string }> = ({
  bev_id,
  customer_id,
}) => {
  const router = useRouter();

  // eslint-disable-next-line unused-imports/no-unused-vars
  const [currentPage, setCurrentPage] = useState(1); //TODO - Consider pagination for categories in OrderForClient

  const { categories } = useCategories({ page: currentPage, limit: 10 });
  const { isSuccess, trigger, isMutating } = useOrderForClient();

  const [isCategoryListActive, setIsCategoryListActive] = useState(true);
  const [category, setCategory] = useState<Partial<TCategory>>({
    id: undefined,
    name: undefined,
  });

  const handleOnCategoryChosen = useCallback(({ id, name }: TCategory) => {
    setCategory({ id, name });
    setIsCategoryListActive(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    trigger({
      beverage_id: +bev_id,
      customer_id: +customer_id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Order has been successfully created!');

      router.push(PARTNER_ORDERS_PATH);
    }
  }, [isSuccess]);

  return (
    <Container title="Order for client">
      <div className="relative">
        <FindCustomerForm setCategoryListState={setIsCategoryListActive} />

        {customer_id && (
          <Categories
            categories={categories}
            onCategoryChosen={handleOnCategoryChosen}
            isListActive={isCategoryListActive}
          />
        )}
      </div>
      {category.id && <BeverageList category={category} />}

      {bev_id && customer_id && (
        <form onSubmit={handleSubmit}>
          <Input type="hidden" name="beverage_id" value={bev_id} />
          <Input type="hidden" name="customer_id" value={customer_id} />
          <SubmitButton isMutating={isMutating}>Order</SubmitButton>
        </form>
      )}
    </Container>
  );
};
