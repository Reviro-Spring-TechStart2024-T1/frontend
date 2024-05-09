import type { Metadata } from 'next';

import { Providers } from '../providers';

export const metadata: Metadata = {
  title: {
    template: 'Establishment | DrinkJoy',
    default: 'DrinkJoy',
  },
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-main overflow-auto">
      <Providers>{children}</Providers>
    </div>
  );
}
