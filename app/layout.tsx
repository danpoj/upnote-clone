import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='h-full flex'>
        <Header />
        <div className='pt-12 flex w-full h-screen'>
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'UpNote clone',
  description: 'UpNote clone project.',
  icons: [
    {
      href: '/favicon.svg',
      url: '/favicon.svg',
    },
  ],
}
