import { TEstablishmentInfoForm } from '@/features/partner-info-form';
import { extractStructuredErrors } from '@/shared/helper';

import { drinkjoyApi } from '../interceptors';

export const editEstablishment = async (
  url: string,
  {
    arg,
  }: {
    arg: Partial<TEstablishmentInfoForm>;
  },
) => {
  try {
    const formData = createFormData(arg);

    const { data } = await drinkjoyApi.patch(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

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
