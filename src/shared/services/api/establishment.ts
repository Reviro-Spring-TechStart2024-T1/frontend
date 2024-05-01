import { drinkjoyApi } from '../interceptors';

export const createEstablishment = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      owner: string;
      name: string;
      email: string;
      latitude: string;
      longitude: string;
      phone_number: string;
      happy_hour_start?: string;
      happy_hour_end?: string;
    };
  },
) => {
  await drinkjoyApi.post(url, { ...arg });
};
