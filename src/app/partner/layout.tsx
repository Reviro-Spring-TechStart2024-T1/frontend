import type { Metadata } from 'next';

import { ChosenEstablishmentProvider } from '@/shared';
import { PartnerHeader } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';

import { Providers } from '../providers';

export const metadata: Metadata = {
  title: {
    template: '%s | DrinkJoy',
    default: 'DrinkJoy',
  },
  description:
    'A place wehere customers can enjoy free beverages at participating businesses duringduringduring specified hours.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ChosenEstablishmentProvider>
        <PartnerHeader />
        <main className="grid grid-cols-[128px_auto] md:block">
          <Sidebar />

          <div className="h-[1px] min-h-main overflow-auto">
            <Providers>{children}</Providers>
          </div>
        </main>
      </ChosenEstablishmentProvider>
    </>
  );
}
