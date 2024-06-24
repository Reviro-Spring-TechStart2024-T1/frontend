import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { UpdatePasswordForm } from '@/features/update-password-form';
import { NO_INDEX_PAGE } from '@/shared';

export const metadata: Metadata = {
  title: 'Update Password',
  ...NO_INDEX_PAGE,
};

export default async function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    redirect('/login'); //NOTE - Need multiple middlewares
  }

  return <UpdatePasswordForm token={token} />;
}
