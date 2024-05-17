'use server';

import { revalidatePath } from 'next/cache';

import { IUserJwtPayload } from '@/entities/user';

export const deleteBeverage = async (id: number, user: IUserJwtPayload) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/partner/beverages/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.access}`,
        },
      },
    ).then(res => res.json());

    console.log(response, 'delete response');

    return {
      message: 'success',
    };
  } catch (error) {
    console.error(error);

    return {
      message: 'error',
      errorMessage: 'Could not delete the beverage.',
    };
  } finally {
    revalidatePath('/partner/menu');
  }
};
