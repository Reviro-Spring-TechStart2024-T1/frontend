'use client';

import { useEffect } from 'react';

import { useCreateModal } from '@/shared';

export const useCloseForm = (
  elementId: string,
  setter: (bool: boolean) => void,
) => {
  const { setModalState } = useCreateModal();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const form = document.getElementById(elementId);
      //@ts-ignore
      if (form && !form.contains(event.target)) {
        setter(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [elementId, setter, setModalState]);
};
