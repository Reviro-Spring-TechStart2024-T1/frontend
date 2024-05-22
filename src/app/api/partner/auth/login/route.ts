import { HttpStatusCode } from 'axios';
import jwt from 'jsonwebtoken';
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
  //NOTE - not used since login is done on client side
  const accessToken = req.headers.get('Authorization')?.split(' ')[1];

  const formDataFromBody = await req.json();

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Authorization token is missing.' },
      { status: 401 },
    );
  }

  try {
    const response = await fetchWithAuth(
      `${process.env.API_URL}/users/token/`,
      //@ts-ignore
      accessToken!,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataFromBody),
      },
    );

    const data: { access: string; refresh: string; detail?: string } =
      await response.json();

    if (!data.access) {
      throw new Error(data.detail);
    }

    const accessToken = jwt.verify(data.access, process.env.SECRET_KEY!);
    console.log(accessToken, 'accessToken route');

    return Response.json({
      access: data.access,
      refresh: data.refresh,
      decodedToken: accessToken,
    });
  } catch (error) {
    return Response.json(
      //@ts-ignore
      { error: error.message },
      { status: HttpStatusCode.NotFound },
    );
  }
};
