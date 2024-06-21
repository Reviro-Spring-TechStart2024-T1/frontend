'use client';

import { useEffect } from 'react';

import { CloseFormProps } from './types';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useCloseForm = ({ elementId, setter }: CloseFormProps) => {
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const pathname = usePathname();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const form = document.getElementById(elementId);
      //@ts-ignore
      if (form && !form.contains(event.target)) {
        setter(false);

        // const params = new URLSearchParams(searchParams); //TODO - Delete id searchParam on clickOutside of the form
        // params.delete('id');

        // const queryString = params.toString();
        // const path = `${pathname}${queryString ? `?${queryString}` : ''}`;

        // router.push(path, { scroll: false });
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => document.removeEventListener('mousedown', handleOutsideClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementId, setter]);
};
