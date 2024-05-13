import type { Metadata } from 'next';

import { Header } from '@/widgets/header';
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
      <Header />
      <main className="grid grid-cols-[128px_auto] md:block">
        <Sidebar />

        <div className="min-h-main overflow-auto">
          <Providers>{children}</Providers>
        </div>
      </main>
    </>
  );
}
