import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/widgets/header/Header';
import Sidebar from '@/widgets/sidebar/ui/Sidebar';

import { Providers } from './providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" className="bg-theme-blue-100">
      <body className={inter.className}>
        <Header />
        <main className="grid grid-cols-[138px_auto]">
          <Sidebar />

          <div className="h-main overflow-auto">
            <Providers>{children}</Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
