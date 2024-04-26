'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type TEditFormContext = {
  isActive: boolean;
  setModalState: (bool: boolean) => void;
};

export const EditModalContext = createContext<TEditFormContext | undefined>(
  undefined,
);

export const useEditModal = () => {
  const context = useContext(EditModalContext);

  if (!context) throw new Error('Error. No context.');

  return context;
};

export const EditModalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isActive, setIsActive] = useState(false);

  const setModalState = (state: boolean) => {
    setIsActive(state);
  };

  return (
    <EditModalContext.Provider value={{ isActive, setModalState }}>
      {children}
    </EditModalContext.Provider>
  );
};
