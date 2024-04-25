'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type TCreateFormContext = {
  isActive: boolean;
  setModalState: (bool: boolean) => void;
};

export const CreateModalContext = createContext<TCreateFormContext | undefined>(
  undefined,
);

export const useCreateModal = () => {
  const context = useContext(CreateModalContext);

  if (!context) throw new Error('Error. No context.');

  return context;
};

export const CreateModalFormContext = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isActive, setIsActive] = useState(false);

  const setModalState = (state: boolean) => {
    setIsActive(state);
  };

  // const [isActive, setModalState] = useMemo(() => {
  //   const manipulateModal = (state: boolean) => {
  //     setActive(state);
  //   };

  //   return [active, manipulateModal];
  // }, [active]);

  return (
    <CreateModalContext.Provider value={{ isActive, setModalState }}>
      {children}
    </CreateModalContext.Provider>
  );
};
