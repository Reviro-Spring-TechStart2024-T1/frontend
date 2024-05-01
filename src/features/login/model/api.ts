'use server';

import { TLoginForm } from '@/features/login';

export const handleLoginSubmit = async (
  currentState: TLoginForm,
  formData: FormData,
) => {
  const values = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch(
      `http://localhost:8080/api/partner/auth/login`,
      {
        method: 'POST',
        body: JSON.stringify(values),
      },
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return {
      status: 'success',
      message: 'Successful autorization!',
      user_id: data.user_id,
    };
  } catch (error) {
    return {
      status: 'error',
      //@ts-ignore
      message: error.message,
    };
  }
};
