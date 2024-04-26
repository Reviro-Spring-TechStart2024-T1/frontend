'use client';

import { Beverage, TBeverage } from '@/entities/beverage';
import { useBeverages } from '@/shared';

export const BeverageList = () => {
  const { data: beverages } = useBeverages<TBeverage[]>();

  return (
    <ul className="px grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-0 xl:grid-cols-4 2xl:grid-cols-5">
      {beverages &&
        beverages?.map(beverage => (
          <Beverage key={beverage.id} {...beverage} />
        ))}
    </ul>
  );
};
