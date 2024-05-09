'use client';

import { ReadonlyURLSearchParams } from 'next/navigation';

export const setId = (id: string, searchParams: ReadonlyURLSearchParams) => {
  const params = new URLSearchParams(searchParams);
  params.set('id', id);

  return params.toString();
};
