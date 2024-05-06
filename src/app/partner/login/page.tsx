import { Metadata } from 'next';

import { LoginForm } from '@/features/login';
import { NO_INDEX_PAGE } from '@/shared';

export const metadata: Metadata = {
  title: 'Partner Login',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return (
    <div className="login flex min-h-dvh items-center justify-center">
      <LoginForm role="partner" />
    </div>
  );
}
