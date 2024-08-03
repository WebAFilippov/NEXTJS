'use client'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { useClickAway } from 'react-use'

interface Props {
  className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState(false)
  const refInput = useRef(null)

  // Добавляем обработчик события клика вне компонента, чтобы при клике в любом месте,
  // кроме самого компонента, сбрасывать состояние фокуса в false.
  useClickAway(refInput, () => setFocused(false))

  return (
    <>
      {focused && <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30' />}
      <div
        className={cn('flex flex-1 relative h-11 justify-between rounded-2xl z-30', className)}
        ref={refInput}
      >
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 ' />
        <input
          type='text'
          placeholder='Поиск...'
          className='w-full h-full pl-11 pr-3 rounded-2xl bg-gray-100 outline-none'
          onFocus={() => setFocused(true)}
        />

        <div
          className={cn(
            'absolute flex flex-col gap-1 w-full top-14 py-2 bg-white rounded-xl shadow-md transition-all duration-200 invisible opacity-0 z-30',
            focused && 'visible opacity-100 top-12',
          )}
        >
          <Link href='/product/1' className='flex items-center gap-3 hover:bg-primary/10 px-2'>
            <img
              src='https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif'
              alt='pizza'
              className='size-8 rounded-sm'
            />
            <span>Сырная 🌱👶</span>
          </Link>
          <Link href='/product/1' className='flex items-center gap-3 hover:bg-primary/10 px-2'>
            <img
              src='https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif'
              alt='pizza'
              className='size-8 rounded-sm'
            />
            <span>Сырная 🌱👶</span>
          </Link>
        </div>
      </div>
    </>
  )
}
