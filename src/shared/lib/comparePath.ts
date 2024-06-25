'use client';

import { usePathname } from 'next/navigation';

export const useComparePath = (path: string) => {
  const pathname = usePathname();

  return path === pathname;
};
