import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/component/footer'
import PersonalAssistantChat from '@/component/chartbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your Site Title',
  description: 'Description of your site',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <PersonalAssistantChat />
        <Footer />
      </body>
    </html>
  )
}
