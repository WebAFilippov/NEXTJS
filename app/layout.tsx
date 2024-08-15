// import { Nunito } from 'next/font/google'
import localFont from 'next/font/local'

import './globals.css'

// const NunitoFont = Nunito({
//   subsets: ['cyrillic'],
//   variable: '--font-nunito',
//   weight: ['400', '500', '600', '700', '800', '900'],
// })

const Dodo = localFont({
  src: [
    {
      path: './fonts/Blogger_Sans.otf',
    },
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
      <body className={Dodo.className}>{children}</body>
    </html>
  )
}

