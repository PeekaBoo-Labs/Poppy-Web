import "@/app/globals.css"
import type { Metadata } from 'next'

import { font } from '@/lib/constants/fonts'

export const metadata: Metadata = {
  title: 'Chute',
  description: 'Get tested with our AI screening application',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.className}>
      {children}
    </html>
  )
}
