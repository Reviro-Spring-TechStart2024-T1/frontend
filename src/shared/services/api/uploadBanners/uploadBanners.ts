import { drinkjoyApi } from '../../interceptors/interceptors';

import { UploadBannersArg } from './types';

export const uploadBanners = async (
  url: string,
  {
    arg,
  }: {
    arg: UploadBannersArg;
  },
) => {
  try {
    //TODO - Think of a way to refactor code - need formdata
    const { banner, establishmentId } = arg;
    const formData = new FormData();
    formData.append('url', banner);
    formData.append('establishment', establishmentId);

    const { data } = await drinkjoyApi.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  } catch (error) {
    console.error('Banner upload error: ', error);
  }
};
