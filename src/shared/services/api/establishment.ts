import { drinkjoyApi } from '../interceptors';

export const createEstablishment = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      owner: string;
      name: string;
      description: string;
      email: string;
      latitude: string;
      longitude: string;
      phone_number: string;
      happy_hour_start?: string;
      happy_hour_end?: string;
      logo: File;
    };
  },
) => {
  //TODO - Think of a way to refactor code - need formdata
  const formData = new FormData();

  const {
    owner,
    name,
    description,
    email,
    latitude,
    longitude,
    phone_number,
    happy_hour_start,
    happy_hour_end,
    logo,
  } = arg;

  formData.append('owner', owner),
    formData.append('name', name),
    formData.append('description', description),
    formData.append('email', email),
    formData.append('latitude', latitude),
    formData.append('longitude', longitude),
    formData.append('phone_number', phone_number),
    formData.append('happy_hour_start', happy_hour_start!),
    formData.append('happy_hour_end', happy_hour_end!),
    formData.append('logo', logo);

  const { data } = await drinkjoyApi.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (data) {
    localStorage.setItem('establishment_id', data.id);
  }

  return data;
};
