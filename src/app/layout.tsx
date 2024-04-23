import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
    <html lang="en">
      <body className={inter.className}>
        <div className="grid grid-cols-[138px_auto] bg-[#EBF2FA]">
          <Sidebar />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
