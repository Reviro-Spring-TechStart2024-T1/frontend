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

export const PUT = async (req: NextRequest) => {
  const accessToken = req.headers.get('Authorization')?.split(' ')[1];
  console.log(accessToken, 'accessToken edit/delete route');

  const formDataFromBody = await req.json();
  console.log(formDataFromBody, 'formDataFromBody post route');

  const url = new URL(req.url);
  const pathSegments = url.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];
  console.log('id edit route');

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Authorization token is missing.' },
      { status: 401 },
    );
  }

  try {
    const response = await fetchWithAuth(
      `${process.env.API_URL}/beverages/${id}/`,
      accessToken,
      {
        method: 'PUT',
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

export const DELETE = async (req: NextRequest) => {
  const accessToken = req.headers.get('Authorization')?.split(' ')[1];
  console.log(accessToken, 'accessToken edit/delete route');

  const pathSegments = req.nextUrl.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];
  console.log(id, 'id delete route');

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Authorization token is missing.' },
      { status: 401 },
    );
  }

  try {
    const response = await fetchWithAuth(
      `${process.env.API_URL}/beverages/${id}/`,
      accessToken,
      {
        method: 'DELETE',
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
