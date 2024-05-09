import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: 'Login | DrinkJoy',
    default: 'DrinkJoy',
  },
  description: '',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-main overflow-auto">{children}</div>;
}
