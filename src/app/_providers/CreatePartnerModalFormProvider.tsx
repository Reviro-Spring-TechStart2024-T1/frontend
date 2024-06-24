'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type TCreatePartnerFormContext = {
  isActive: boolean;
  setModalState: (bool: boolean) => void;
};

export const CreatePartnerModalContext = createContext<
  TCreatePartnerFormContext | undefined
>(undefined);

export const useCreatePartnerModal = () => {
  const context = useContext(CreatePartnerModalContext);

  if (!context) throw new Error('Error. No context.');

  return context;
};

export const CreatePartnerModalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isActive, setIsActive] = useState(false);

  const setModalState = (state: boolean) => {
    setIsActive(state);
  };

  return (
    <CreatePartnerModalContext.Provider value={{ isActive, setModalState }}>
      {children}
    </CreatePartnerModalContext.Provider>
  );
};
