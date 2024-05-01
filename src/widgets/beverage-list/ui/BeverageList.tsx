'use client';

import { RiMenu2Line } from '@remixicon/react';
import useSWR from 'swr';

import { Beverage } from '@/entities/beverage';
import { fetcher, useCreateModal } from '@/shared';
import { Button, Section, Typography } from '@/shared/ui';
import { createMenu, TMenusResponse } from '@/widgets/beverage-list';

export const BeverageList = () => {
  const establishmentId = 1; //TODO - establishment_id from localStorage'

  const {
    data: menu,
    isLoading,
    error,
  } = useSWR<TMenusResponse>(`/menus/${establishmentId}`, fetcher);

  // const { trigger } = useSWRMutation(`/menus/${establishmentId}`, fetcher); //TODO - maybe use SWR

  const { setModalState } = useCreateModal();

  return (
    <div className="min-h-[calc(100dvh-340px)]">
      {
        isLoading && <div>Loading...</div> // TODO - Menu Skeleton
      }
      {error && (
        <div className="flex flex-col items-center justify-center gap-4">
          <Typography variant="h2">
            Establishment does not possess any menu.
          </Typography>
          <RiMenu2Line className="h-[70px] w-[70px]" />
          <Button
            onClick={() => createMenu(establishmentId)}
            className="w-2/4 text-xl"
          >
            Create Menu
          </Button>
        </div>
      )}
      {menu && (
        <Section>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setModalState(true)}>
              <Typography variant="paragraph">Create beverage</Typography>
            </Button>
          </div>

          <ul className="px grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-0 xl:grid-cols-4 2xl:grid-cols-5">
            {menu.beverages &&
              menu.beverages?.map(beverage => (
                <Beverage key={beverage.id} {...beverage} />
              ))}
          </ul>
        </Section>
      )}
    </div>
  );
};
