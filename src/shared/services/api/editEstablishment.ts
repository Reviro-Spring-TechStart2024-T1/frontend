import { extractStructuredErrors } from '@/shared/helper';

import { drinkjoyApi } from '../interceptors';

export const editEstablishment = async (
  url: string,
  {
    arg,
  }: {
    arg: Partial<{
      name: string;
      description: string;
      email: string;
      latitude: string;
      longitude: string;
      phone_number: string;
      happy_hour_start: string;
      happy_hour_end: string;
      street_name: string;
      street_number: string;
      logo: File;
    }>;
  },
) => {
  try {
    const formData = createFormData(arg);

    const { data } = await drinkjoyApi.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    localStorage.setItem('establishment_id', data.id);
    return data;
  } catch (error: any) {
    throw extractStructuredErrors(error.response.data);
  }
};

const createFormData = (arg: Record<string, any>) => {
  const formData = new FormData();

  Object.entries(arg).forEach(([key, value]) => {
    if (!!value) {
      formData.append(key, value);
    }
  });

  return formData;
};
