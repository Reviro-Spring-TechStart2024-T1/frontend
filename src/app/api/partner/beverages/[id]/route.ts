export const PUT = async (req: Request) => {
  const formDataFromBody = await req.json();

  const url = new URL(req.url);
  const pathSegments = url.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];

  try {
    const response = await fetch(`${process.env.API_URL}/beverages/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${process.env.ACCESS!}`,
      },
      body: JSON.stringify(formDataFromBody),
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

export const DELETE = async (req: Request) => {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];

  try {
    const response = await fetch(`${process.env.API_URL}/beverages/${id}/`, {
      method: 'DELETE',
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
