import { Header } from '@/components/shared'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
  description: 'Главная страница сайта Next Pizza',
}

export default function ProjectLoyout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode
  children: React.ReactNode
}>) {
  return (
    <main className='min-h-screen'>
      <Header />
      {children}
      {modal}
    </main>
  )
}
