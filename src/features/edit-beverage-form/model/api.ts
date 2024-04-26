'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { TFormState } from '@/features/edit-beverage-form';

const FormSchema = z.object({
  name: z
    .string({ required_error: 'Name is required.' })
    .min(1, { message: 'Name should not be empty.' })
    .max(50, { message: 'Name should not be more than 50 characters.' }),
  category: z
    .string({
      required_error: 'Category is required.',
    })
    .min(1, { message: 'Category should not be empty.' })
    .max(50, { message: 'Category should not be more than 50 characters.' }),
  price: z
    .number({ required_error: 'Price is required.' })
    .gt(0, { message: 'Please enter an amount greater than 0.' }),
  desc: z
    .string({ required_error: 'Description is required.' })
    .min(1, { message: 'Description should not be empty.' })
    .max(100, {
      message: 'Description should not be more than 100 characters.',
    }),
  quantity: z
    .number({ required_error: 'Quantity is required.' })
    .gte(0, { message: 'Please enter an amount greater or equal than 0.' })
    .min(1, { message: 'Quantity should not be empty.' }),
  image: z.object({}),
});

export const editBeverage = async (
  id: number,
  currentState: TFormState,
  formData: FormData,
) => {
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const price = formData.get('price') as string;
  const desc = formData.get('desc') as string;
  const quantity = formData.get('quantity') as string;
  const image = formData.get('image') as object;

  const validatedFields = FormSchema.safeParse({
    name,
    category,
    price: Number(price),
    desc,
    quantity: Number(quantity),
    image,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'error',
    };
  }
  console.log(id);

  try {
    await fetch(`${process.env.API_URL}/beverages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(validatedFields.data),
    }).then(res => res.json());

    return {
      message: 'success',
      errors: undefined,
      fieldValues: {
        name: '',
        category: '',
        price: '',
        desc: '',
        quantity: '',
        image: {},
      },
    };
  } catch (error) {
    console.error(error);

    return {
      message: 'error',
      errors: undefined,
      errorMessage: 'Could not edit the beverage.',
      fieldValues: {
        name,
        category,
        price,
        desc,
        quantity,
        image,
      },
    };
  } finally {
    revalidatePath('/partner/menu');
  }
};
