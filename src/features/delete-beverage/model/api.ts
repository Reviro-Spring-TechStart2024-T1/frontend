'use server';

import { revalidatePath } from 'next/cache';

export const deleteBeverage = async (id: number) => {
  try {
    await fetch(`http://localhost:8080/api/partner/beverages/${id}`, {
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
