'use client';

import { createContext, useContext, useState } from 'react';

import { TEstablishment } from '@/shared';

type TEstablishmentContextProps = {
  chosenEstablishment: TEstablishment | null;
  setChosenEstablishment: React.Dispatch<
    React.SetStateAction<TEstablishment | null>
  >;
};

export const ChosenEstablishmentContext =
  createContext<TEstablishmentContextProps | null>(null);

export const useChosenEstablishmentContext = () => {
  const props = useContext(ChosenEstablishmentContext);

  if (!props) {
    throw new Error('There is no ChosenEstablishment context.');
  }

  return props;
};

export const ChosenEstablishmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [chosenEstablishment, setChosenEstablishment] =
    useState<TEstablishment | null>(null);

  return (
    <ChosenEstablishmentContext.Provider
      value={{
        chosenEstablishment,
        setChosenEstablishment,
      }}
    >
      {children}
    </ChosenEstablishmentContext.Provider>
  );
};
