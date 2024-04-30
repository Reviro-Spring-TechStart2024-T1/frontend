import { HttpStatusCode } from 'axios';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const formDataFromBody = await req.json();

  try {
    const response = await fetch(`${process.env.API_URL}/users/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataFromBody),
    });

    const data: { access: string; refresh: string; detail?: string } =
      await response.json();

    if (!data.access) {
      throw new Error(data.detail);
    }

    const accessToken = jwt.verify(data.access, process.env.SECRET_KEY!);
    console.log(accessToken, 'accessToken route');

    return Response.json(accessToken);
  } catch (error) {
    return Response.json(
      //@ts-ignore
      { error: error.message },
      { status: HttpStatusCode.NotFound },
    );
  }
};
