import type { Metadata } from 'next';

import { ChosenEstablishmentProvider } from '@/shared';
import { AdminHeader } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';

import { Providers } from '../providers';

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
    <>
      <AdminHeader />
      <main className="grid grid-cols-[128px_auto] md:block">
        <ChosenEstablishmentProvider>
          <Sidebar />
        </ChosenEstablishmentProvider>

        <div className="min-h-main overflow-auto">
          <Providers>{children}</Providers>
        </div>
      </main>
    </>
  );
}
