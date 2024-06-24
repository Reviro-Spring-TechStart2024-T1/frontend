import type { Metadata } from 'next';

import { ForgotPasswordForm } from '@/features/forgot-password-form';
import { NO_INDEX_PAGE } from '@/shared';

export const metadata: Metadata = {
  title: 'Forgot Password',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return <ForgotPasswordForm />;
}
