export const getQRCode = async (id: number) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/partner/qrcodes/${id}`,
      {
        method: 'GET',
      },
    ).then(res => res.json());

    return response;
  } catch (error) {
    //@ts-ignore
    return { error: error.message };
  }
};
