'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type TDeleteContext = {
  isActive: boolean;
  setModalState: (bool: boolean) => void;
};

export const DeleteModalContext = createContext<TDeleteContext | undefined>(
  undefined,
);

export const useDeleteModal = () => {
  const context = useContext(DeleteModalContext);

  if (!context) throw new Error('Error. No context.');

  return context;
};

export const DeleteModalProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);

  const setModalState = (state: boolean) => {
    setIsActive(state);
  };

  return (
    <DeleteModalContext.Provider value={{ isActive, setModalState }}>
      {children}
    </DeleteModalContext.Provider>
  );
};
