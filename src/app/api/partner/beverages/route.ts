import { NextRequest, NextResponse } from 'next/server';

const fetchWithAuth = async (
  url: string,
  token: string,
  options: RequestInit = {},
) => {
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const updatedOptions = {
    ...options,
    headers,
  };

  return fetch(url, updatedOptions);
};

export const POST = async (req: NextRequest) => {
  const accessToken = req.headers.get('Authorization')?.split(' ')[1];
  console.log(accessToken, 'accessToken create route');
  const formDataFromBody = await req.json();
  console.log(formDataFromBody, 'formDataFromBody post route');

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Authorization token is missing.' },
      { status: 401 },
    );
  }

  try {
    const response = await fetchWithAuth(
      `${process.env.API_URL}/beverages/`,
      accessToken,
      {
        method: 'POST',
        body: JSON.stringify(formDataFromBody),
      },
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      //@ts-ignore
      { error: error.message },
    );
  }
};
