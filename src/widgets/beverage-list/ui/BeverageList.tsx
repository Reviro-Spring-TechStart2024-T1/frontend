'use client';

import { FC, useMemo } from 'react';
import { RiMenu2Line } from '@remixicon/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useSWRConfig } from 'swr';

import { Beverage } from '@/entities/beverage';
import { TCategory } from '@/entities/category';
import {
  PARTNER_ORDER_FOR_CLIENT_PATH,
  useChosenEstablishmentContext,
  useCreateModal,
} from '@/shared';
import useLocalStorage from '@/shared/helper/hooks/useLocalStorage';
import { Button, Typography } from '@/shared/ui';
import { useCreateMenu, useMenu } from '@/widgets/beverage-list';

export const BeverageList: FC<{ category?: Partial<TCategory> }> = ({
  category,
}) => {
  const { setModalState } = useCreateModal();
  const { chosenEstablishment, isChosenEstablishmentLoading } =
    useChosenEstablishmentContext();

  const [_, setMenuId] = useLocalStorage<number | null>('menu_id', null);

  const pathname = usePathname();

  const { mutate } = useSWRConfig();

  const {
    data: menu,
    isLoading,
    error,
  } = useMenu(chosenEstablishment?.menu_id);
  const { trigger } = useCreateMenu();

  const beverages = useMemo(() => {
    if (category) {
      return menu?.beverages.filter(
        beverage => +beverage.category === category.id,
      );
    }

    return menu?.beverages;
  }, [category, menu?.beverages]);

  const handleOnCreateMenu = async () => {
    if (chosenEstablishment?.id) {
      const res = await trigger({
        establishment: chosenEstablishment.id,
      });

      setMenuId(res.id);

      mutate(`/establishments/partner/`);
    }
  };

  return (
    <>
      {error}
      {
        isChosenEstablishmentLoading || isLoading ? <div>Loading...</div> : null // TODO - Menu Skeleton
      }
      {!isChosenEstablishmentLoading && !chosenEstablishment?.menu_id && (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <Typography variant="h2" className="text-center">
            Establishment does not possess any menu.
          </Typography>
          <RiMenu2Line className="h-[70px] w-[70px]" />
          <Button onClick={handleOnCreateMenu} className="w-2/4 text-xl">
            Create Menu
          </Button>
        </div>
      )}
      {menu && (
        <>
          {pathname !== PARTNER_ORDER_FOR_CLIENT_PATH && (
            <div className="flex justify-end">
              <Button variant="primary" onClick={() => setModalState(true)}>
                <Typography variant="paragraph">Create beverage</Typography>
              </Button>
            </div>
          )}
          {beverages?.length === 0 && (
            <Typography variant="h3" className="text-center">
              No beverages, create some!
            </Typography>
          )}
          <ul
            className={clsx(
              'grid grid-cols-4 gap-10 xl:grid-cols-3 xl:px-0 lg:grid-cols-2 sm:grid-cols-1',
              {
                'grid-cols-1': beverages?.length === 0,
              },
            )}
          >
            {beverages?.map(beverage => (
              <Beverage key={beverage.id} {...beverage} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};
