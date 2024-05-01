'use client';

import { type TMenusResponse } from '@/widgets/beverage-list';

export const createMenu = async (establishmentId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1MTc1Njc5LCJpYXQiOjE3MTQ1NzA4NzksImp0aSI6IjAxMDViM2YyOGJhZTQ1MjNiNGZlZWRmOGQ4ZTA2ODQ2IiwidXNlcl9pZCI6NX0.eO9Zwcz77ZQTb2hUofIbKGs5YDHZgAZcVEMCWqTJuPE',
    },
    body: JSON.stringify({
      establishment: establishmentId,
    }),
  });

  const data: TMenusResponse = await response.json();

  return data;
};
