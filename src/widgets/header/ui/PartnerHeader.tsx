'use client';

import { useEffect, useMemo, useState } from 'react';
import { RiMenuFill, RiProfileLine } from '@remixicon/react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useChosenEstablishmentContext } from '@/app/_providers';
import {
  ESTABLISHMENT_EDIT_PATH,
  PARTNER_PROFILE_PATH,
  useGetEstablishments,
  useLocalStorage,
} from '@/shared';
import { Button, Typography } from '@/shared/ui';
import { Dropdown } from '@/widgets/dropdown';
import { Navbar } from '@/widgets/navbar';

export const PartnerHeader = () => {
  const pathname = usePathname();

  const { establishment, isLoading } = useGetEstablishments();
  const [_, setEstablishmentId] = useLocalStorage<number | null>(
    'establishment_id',
    null,
  );

  const [showNavbarDropDown, setShowNavbarDropDown] = useState(false);
  const [showEstablishmentsDropDown, setShowEstablishmentsDropDown] =
    useState(false);
  const {
    chosenEstablishment,
    setChosenEstablishment,
    setIsChosenEstablishmentLoading,
  } = useChosenEstablishmentContext();

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
    if (isLoading) {
      setIsChosenEstablishmentLoading(true);
    } else {
      setIsChosenEstablishmentLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!establishment?.results.length) {
      setChosenEstablishment(null);
    }
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
      <div className="relative mx-auto hidden h-[60px] max-w-none items-center px-4 md:flex">
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
                <Dropdown className="absolute right-0 top-10 z-10 w-[300px]">
                  <ul className="p-1">{filteredEstablishments}</ul>
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

      <div
        className={clsx(
          'relative mx-auto flex h-[76px] max-w-7xl items-center px-8 md:hidden',
          {
            'mx-0 max-w-full justify-between':
              pathname === ESTABLISHMENT_EDIT_PATH,
          },
        )}
      >
        <div className="flex flex-1 items-center gap-2">
          <Typography variant="caption" color="grey">
            Establishment
          </Typography>
          {pathname === ESTABLISHMENT_EDIT_PATH && (
            <Link
              href={PARTNER_PROFILE_PATH}
              className="rounded-md bg-theme-white px-2 py-2 transition-colors duration-200 hover:bg-theme-grey-200 active:bg-theme-grey-300"
            >
              To profile page
            </Link>
          )}
        </div>

        {isLoading && <Typography variant="caption">Loading...</Typography>}

        {establishment?.results.length === 0 && (
          <Typography variant="caption">There is no establishment.</Typography>
        )}

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
                <Dropdown className="absolute right-0 top-10 z-10 w-[300px]">
                  <ul className="p-2">{filteredEstablishments}</ul>
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
          </>
        )}
      </div>
    </header>
  );
};
