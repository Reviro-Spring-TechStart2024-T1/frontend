import { drinkjoyApi } from '../../interceptors/interceptors';

export const deleteBanner = async (url: string) => {
  try {
    const { status } = await drinkjoyApi.delete(url);

    if (status !== 204) {
      throw new Error('Error. Banner could not be deleted.');
    }

    return status === 204;
  } catch (error: any) {
    console.error('Banner deletion error: ', error);
    throw error.message;
  }
};
