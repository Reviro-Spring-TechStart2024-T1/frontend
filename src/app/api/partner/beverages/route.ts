export const POST = async (req: Request) => {
  const formDataFromBody = await req.json();

  try {
    const response = await fetch(`${process.env.API_URL}/beverages/`, {
      method: 'POST',
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
