export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];

  try {
    const response = await fetch(`${process.env.API_URL}/qrcodes/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${process.env.ACCESS!}`,
      },
    });

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    return Response.json(
      //@ts-ignore
      { error: error.message },
    );
  }
};
