'use client';

import { Beverage, TBeverage } from '@/entities/beverage';
import { useBeverages, useCreateModal } from '@/shared';
import { Button, Section, Typography } from '@/shared/ui';

export const BeverageList = () => {
  const { data: beverages } = useBeverages<TBeverage[]>();
  const { setModalState } = useCreateModal();

  return (
    <Section>
      <div className="flex justify-end">
        <Button variant="primary" onClick={() => setModalState(true)}>
          <Typography variant="paragraph">Create beverage</Typography>
        </Button>
      </div>

      <ul className="px grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-0 xl:grid-cols-4 2xl:grid-cols-5">
        {beverages &&
          beverages?.map(beverage => (
            <Beverage key={beverage.id} {...beverage} />
          ))}
      </ul>
    </Section>
  );
};
