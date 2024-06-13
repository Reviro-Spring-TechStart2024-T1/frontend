'use client';

import { useEffect, useState } from 'react';
import { RiMenuFill, RiProfileLine } from '@remixicon/react';
import clsx from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { useChosenEstablishmentContext, useLocalStorage } from '@/shared';
import { useGetEstablishments } from '@/shared';
import { Button, Typography } from '@/shared/ui';
import { Dropdown } from '@/widgets/dropdown';
import { Navbar } from '@/widgets/navbar';

export const PartnerHeader = () => {
  const pathname = usePathname();

  const { establishment } = useGetEstablishments();
  const [_, setEstablishmentId] = useLocalStorage<number | null>(
    'establishment_id',
    null,
  );

  const [showNavbarDropDown, setShowNavbarDropDown] = useState(false);
  const [showEstablishmentsDropDown, setShowEstablishmentsDropDown] =
    useState(false);
  const { chosenEstablishment, setChosenEstablishment } =
    useChosenEstablishmentContext();

  const filteredEstablishments = establishment?.results
    .filter(establishment => establishment.id !== chosenEstablishment?.id)
    .map(filteredEstablishment => (
      <li
        key={filteredEstablishment.id}
        className="cursor-pointer rounded-md bg-gray-300 p-2 text-center transition-opacity duration-200 hover:opacity-80"
        onClick={() => handleOnEstablishmentChosen(filteredEstablishment.id)}
      >
        {filteredEstablishment.name}
      </li>
    ));

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
    if (establishment?.results.length) {
      setEstablishmentId(establishment?.results[0].id);
      setChosenEstablishment(establishment?.results[0]);
    }
  }, [establishment]);

  useEffect(() => {
    setShowNavbarDropDown(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        'bg-theme-white shadow-md md:ml-0 md:w-full md:bg-[#111828] md:text-theme-white',
        {
          'ml-[128px] w-header': !pathname.includes('establishment'),
        },
      )}
    >
      <div className="mx-auto hidden h-[60px] max-w-none items-center px-4 md:flex">
        <div className="flex flex-1 gap-4">
          <Button
            variant="none"
            onClick={() => setShowNavbarDropDown(!showNavbarDropDown)}
          >
            <RiMenuFill />
          </Button>

          {/* FIX_ME: place img logo */}
        </div>

        <div className="flex flex-1 justify-end">
          {chosenEstablishment ? (
            <Button
              variant="none"
              className="flex flex-1 items-center justify-end gap-2"
              onClick={() =>
                setShowEstablishmentsDropDown(!showEstablishmentsDropDown)
              }
              onBlur={() => setShowEstablishmentsDropDown(false)}
            >
              {showEstablishmentsDropDown && (
                <Dropdown className="w-2/4">
                  <ul className="absolute top-0 z-10 w-full p-2">
                    {filteredEstablishments}
                  </ul>
                </Dropdown>
              )}

              <Typography variant="paragraph">
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
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>

      {showNavbarDropDown ? (
        <Dropdown>
          <Navbar />
        </Dropdown>
      ) : null}

      <div className="mx-auto flex h-[76px] max-w-7xl items-center px-8 md:hidden ">
        <div className="flex-1">
          <Typography variant="caption" color="grey">
            Establishment
          </Typography>
        </div>

        {chosenEstablishment ? (
          <Button
            variant="none"
            className="flex flex-1 items-center justify-end gap-2"
            onClick={() =>
              setShowEstablishmentsDropDown(!showEstablishmentsDropDown)
            }
            onBlur={() => setShowEstablishmentsDropDown(false)}
          >
            {showEstablishmentsDropDown && (
              <Dropdown className="w-2/4">
                <ul className="absolute top-0 z-10 w-full p-2">
                  {filteredEstablishments}
                </ul>
              </Dropdown>
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
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </header>
  );
};
