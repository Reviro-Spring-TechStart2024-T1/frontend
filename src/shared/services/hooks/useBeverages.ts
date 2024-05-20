'use client';

import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/shared';

export const useBeverages = <T>(url: string) =>
  useSWRImmutable<T>(url, fetcher, {
    refreshInterval: 0,
  });
