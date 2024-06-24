import type { Metadata } from 'next';

import { ChosenEstablishmentProvider } from '@/app/_providers';
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: {
    template: '%s | DrinkJoy',
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
      <Providers>
        <ChosenEstablishmentProvider>{children}</ChosenEstablishmentProvider>
      </Providers>
    </div>
  );
}
