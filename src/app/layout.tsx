// app/layout.tsx

import './globals.css'
import Footer from '../component/footer'
import Header from '../component/header'
import { body, image } from 'framer-motion/client'
import AIChatbot from '@/component/chartbot'

export const metadata = {
  title: 'Prakash Venket',
  description: 'Portfolio website',
    icons: {
    icon: '/images/iconlogo.png',  // <-- add your favicon path here
    // you can also add shortcut or apple icons if you want:
    shortcut: '/images/iconlogo.png',
    apple: '/images/iconlogo.png',
  },
  openGraph: {
    images: ['/images/iconlogo.png'],  // for social cards
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <AIChatbot />
        <Footer /> {/* Only here */}
      </body>
    </html>
  )
}
