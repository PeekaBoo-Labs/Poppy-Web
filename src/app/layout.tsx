import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const font = localFont({
  src: [
    {
      path: "../../public/fonts/open-runde-woff2/OpenRunde-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../public/fonts/open-runde-woff2/OpenRunde-Bold.woff2",
      weight: "700",
      style: "normal"
    },
    {
      path: "../../public/fonts/open-runde-woff2/OpenRunde-Medium.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "../../public/fonts/open-runde-woff2/OpenRunde-Semibold.woff2",
      weight: "600",
      style: "normal"
    }
  ]
})

export const metadata: Metadata = {
  title: 'Chute',
  description: 'Get tested with our AI screening application',
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={font.className}>
      {children}
    </html >
  )
}
