'use client';

import { useEffect, useRef } from 'react';

type THandler = (event: TouchEvent | MouseEvent) => void;

export const useClickOutside = (handler: THandler) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: TouchEvent | MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('touchstart', listener);
    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('touchstart', listener);
      document.removeEventListener('mousedown', listener);
    };
  }, [handler]);

  return ref;
};
