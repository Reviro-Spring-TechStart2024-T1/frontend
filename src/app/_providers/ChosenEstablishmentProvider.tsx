'use client';

import { createContext, useContext, useState } from 'react';

import { TEstablishment } from '@/shared';

type TEstablishmentContextProps = {
  chosenEstablishment: Partial<TEstablishment> | null;
  setChosenEstablishment: React.Dispatch<
    React.SetStateAction<Partial<TEstablishment> | null>
  >;
  isChosenEstablishmentLoading: boolean;
  setIsChosenEstablishmentLoading: (state: boolean) => void;
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
    useState<Partial<TEstablishment> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ChosenEstablishmentContext.Provider
      value={{
        chosenEstablishment,
        setChosenEstablishment,
        isChosenEstablishmentLoading: isLoading,
        setIsChosenEstablishmentLoading: setIsLoading,
      }}
    >
      {children}
    </ChosenEstablishmentContext.Provider>
  );
};
