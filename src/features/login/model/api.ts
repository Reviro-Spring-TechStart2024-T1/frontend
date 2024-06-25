'use server';

import { TLoginForm } from './types';

export const handleLoginSubmit = async (
  currentState: TLoginForm,
  accessToken: string,
  formData: FormData,
) => {
  const values = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/partner/auth/login`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
      user_id: data.decodedToken.user_id,
      access: data.access,
      refresh: data.refresh,
    };
  } catch (error) {
    return {
      status: 'error',
      //@ts-ignore
      message: error.message,
    };
  }
};
