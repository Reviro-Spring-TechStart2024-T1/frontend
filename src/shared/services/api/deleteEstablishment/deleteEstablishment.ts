import { drinkjoyApi } from '../../interceptors/interceptors';

export const deleteEstablishment = async (url: string) => {
  try {
    const { status } = await drinkjoyApi.delete(url);

    if (status !== 204) {
      throw new Error();
    }

    return status === 204;
  } catch (error: any) {
    console.error('Establishment deletion error: ', error);
    throw error.response.data.detail;
  }
};
