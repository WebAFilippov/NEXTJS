// import { Nunito } from 'next/font/google'
import localFont from 'next/font/local'

import './globals.css'
import { cn } from '@/shared/lib'

// const NunitoFont = Nunito({
//   subsets: ['cyrillic'],
//   variable: '--font-nunito',
//   weight: ['400', '500', '600', '700', '800', '900'],
// })

const Dodo = localFont({
  src: './fonts/Dodo.woff2',
  variable: '--font-dodo',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen-Sans',
    'Ubuntu',
    'Cantarell',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
})

export default function ProjectLoyout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link data-rh='true' rel='icon' href='/logo.png' />
      </head>
      <body className={cn(Dodo.className, Dodo.variable)}>{children}</body>
    </html>
  )
}

