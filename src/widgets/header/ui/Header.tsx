'use client';

import { useEffect, useMemo, useState } from 'react';
import { RiMenuFill, RiProfileLine } from '@remixicon/react';
import clsx from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { useChosenEstablishmentContext } from '@/app/_providers';
import { useGetEstablishments, useLocalStorage } from '@/shared';
import { BreadCrumbs, Button, Typography } from '@/shared/ui';
import { Dropdown } from '@/widgets/dropdown';

export const Header = () => {
  const pathname = usePathname();

  const { establishment, isLoading } = useGetEstablishments();
  const [_, setEstablishmentId] = useLocalStorage<number | null>(
    'establishment_id',
    null,
  );

  const [showDropDown, setShowDropDown] = useState(false);
  const [showEstablishmentsDropDown, setShowEstablishmentsDropDown] =
    useState(false);
  const { chosenEstablishment, setChosenEstablishment } =
    useChosenEstablishmentContext();

  const filteredEstablishments = useMemo(() => {
    return establishment?.results
      .filter(establishment => establishment.id !== chosenEstablishment?.id)
      .map(filteredEstablishment => (
        <li
          key={filteredEstablishment.id}
          className="flex min-h-[80px] cursor-pointer items-center gap-1 rounded-md bg-gray-300 p-2 text-center transition-opacity duration-200 hover:opacity-80"
          onClick={() => handleOnEstablishmentChosen(filteredEstablishment.id)}
        >
          <Image
            src={filteredEstablishment.logo!}
            alt="logo"
            width={60}
            height={100}
          />
          <Typography className="flex-1" variant="caption">
            {filteredEstablishment.name}
          </Typography>
        </li>
      ));
  }, [establishment, chosenEstablishment]);

  const handleOnEstablishmentChosen = (id: number) => {
    setEstablishmentId(id);
    setChosenEstablishment(() => {
      const establishmentFound = establishment?.results.find(
        establishment => establishment.id === id,
      );

      return establishmentFound || null;
    });
  };

  useEffect(() => {
    setShowDropDown(false);
  }, [pathname]);

  useEffect(() => {
    if (!establishment?.results.length) {
      setChosenEstablishment(null);
    }
    if (establishment?.results.length) {
      setEstablishmentId(establishment?.results[0].id);
      setChosenEstablishment(establishment?.results[0]);
    }
  }, [establishment]);

  return (
    <header
      className={clsx(
        'bg-theme-white shadow-md md:ml-0 md:w-full md:bg-[#111828] md:text-theme-white',
        {
          'ml-[128px] w-header': !pathname.includes('establishment'),
        },
      )}
    >
      <div className="relative mx-auto hidden h-[60px] max-w-none items-center px-4 md:flex">
        <div className="flex flex-1 gap-4">
          <Button variant="none" onClick={() => setShowDropDown(!showDropDown)}>
            <RiMenuFill />
          </Button>
        </div>

        <div className="flex flex-1 justify-end">
          {chosenEstablishment && (
            <Button
              variant="none"
              className="flex flex-1 items-center justify-end gap-2"
              onClick={() =>
                setShowEstablishmentsDropDown(!showEstablishmentsDropDown)
              }
              onBlur={() => setShowEstablishmentsDropDown(false)}
            >
              {showEstablishmentsDropDown && (
                <div className="absolute right-0 top-10 z-10 w-[300px]">
                  <ul className="p-1">{filteredEstablishments}</ul>
                </div>
              )}
              <Typography variant="paragraph" className="md:text-xs">
                {chosenEstablishment?.name}
              </Typography>

              {chosenEstablishment.logo ? (
                <Image
                  src={chosenEstablishment.logo}
                  alt="Logo"
                  width={50}
                  height={50}
                />
              ) : (
                <RiProfileLine />
              )}
            </Button>
          )}
        </div>
      </div>

      {showDropDown ? <Dropdown /> : null}

      <div className="relative mx-auto flex h-[76px] max-w-7xl items-center px-8 md:hidden">
        <div className="flex flex-1 items-center gap-2">
          <BreadCrumbs />
        </div>

        {/* FIX_ME: Show establishment */}
        {/* {establishment?.results.length === 0 && (
          <Typography variant="caption">There is no establishment.</Typography>
        )} */}

        {chosenEstablishment && (
          <>
            <Button
              variant="none"
              className="flex flex-1 items-center justify-end gap-2"
              onClick={() =>
                setShowEstablishmentsDropDown(!showEstablishmentsDropDown)
              }
              onBlur={() => setShowEstablishmentsDropDown(false)}
            >
              {showEstablishmentsDropDown && (
                <div className="absolute right-0 top-10 z-10 w-[300px]">
                  <ul className="p-2">{filteredEstablishments}</ul>
                </div>
              )}
              <Typography variant="paragraph" color="grey">
                {chosenEstablishment?.name}
              </Typography>

              {chosenEstablishment.logo ? (
                <Image
                  src={chosenEstablishment.logo}
                  alt="Logo"
                  width={50}
                  height={50}
                />
              ) : (
                <RiProfileLine />
              )}
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
