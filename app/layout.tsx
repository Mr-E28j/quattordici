import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quattordici - Soneto Interactivo',
  description: 'Crea y analiza sonetos en tiempo real con métricas y rimas perfectas. Una herramienta poética interactiva.',
  generator: 'Next.js',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
