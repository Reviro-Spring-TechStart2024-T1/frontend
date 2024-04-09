import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        template: '%s | DrinkJoy',
        default: 'DrinkJoy'
    },
    description:
        'A place wehere customers can enjoy free beverages at participating businesses during specified hours.'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>{children}</body>
        </html>
    )
}
