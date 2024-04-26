'use server';

import { revalidatePath } from 'next/cache';

export const deleteBeverage = async (id: number) => {
  try {
    await fetch(`${process.env.API_URL}/beverages/${id}`, {
      method: 'DELETE',
    }).then(res => res.json());

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
