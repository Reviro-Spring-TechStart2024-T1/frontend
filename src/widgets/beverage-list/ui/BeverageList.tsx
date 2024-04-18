'use client';

import { Beverage, TBeverage } from '@/entities/beverage';
import { useBeverages, useEditModal } from '@/shared';

export const BeverageList = () => {
  const { data: beverages } = useBeverages<TBeverage[]>();

  const { setModalState } = useEditModal();

  return (
    <ul className="px grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-0 xl:grid-cols-4 2xl:grid-cols-5">
      {beverages &&
        beverages?.map(beverage => (
          <Beverage
            key={beverage.id}
            showEditModal={() => setModalState(true)}
            {...beverage}
          />
        ))}
    </ul>
  );
};
