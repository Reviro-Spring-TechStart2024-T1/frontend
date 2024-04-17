'use server';

import { revalidatePath } from 'next/cache';

import { TFormState } from '@/widgets/create-beverage-form';

export const createBeverage = async (
  currentState: TFormState,
  formData: FormData,
) => {
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const price = formData.get('price') as unknown as number;
  const desc = formData.get('desc') as string;
  const image = formData.get('image') as null;
  const isAvailable = formData.get('isAvailable') as unknown as boolean;

  try {
    const formValues = {
      name,
      category,
      price,
      desc,
      image,
      isAvailable,
    };
    await fetch(`${process.env.API_URL}/beverages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    }).then(res => res.json());

    return {
      message: 'success',
      errors: '',
      fieldValues: {
        name: '',
        category: '',
        price: null,
        desc: '',
        image: undefined,
        isAvailable: false,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      message: 'error',
      errors: 'Could not create the beverage.',
      fieldValues: {
        name,
        category,
        price,
        desc,
        image,
        isAvailable,
      },
    };
  } finally {
    revalidatePath('/partner/menu');
  }
};
