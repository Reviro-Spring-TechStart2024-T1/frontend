import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/app/providers';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';

import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | DrinkJoy',
    default: 'DrinkJoy',
  },
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

          <div className="min-h-main overflow-auto">
            <Providers>{children}</Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
