import { Nunito } from 'next/font/google'

import './globals.css'

const NunitoFont = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
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
      <body className={NunitoFont.className}>{children}</body>
    </html>
  )
}

