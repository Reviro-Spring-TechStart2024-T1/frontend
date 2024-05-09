import { drinkjoyApi } from '../interceptors';

export const createEstablishment = async (
  url: string,
  {
    args,
  }: {
    args: {
      owner: string;
      name: string;
      description: string;
      email: string;
      latitude: string;
      longitude: string;
      phone_number: string;
      happy_hour_start?: string;
      happy_hour_end?: string;
    };
  },
) => {
  const { data } = await drinkjoyApi.post(url, { ...args });

  if (data) {
    localStorage.setItem('establishment_id', data.id);
  }

  return data;
};
