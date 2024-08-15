'use client'
import { ProductWithVariantsIngredients } from '@/@types'
import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-client'
import { Product } from '@prisma/client'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'

interface Props {
  className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchValue, setSearchValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [products, setProducts] = useState<ProductWithVariantsIngredients[]>([])
  const refInput = useRef(null)

  // Добавляем обработчик события клика вне компонента, чтобы при клике в любом месте,
  // кроме самого компонента, сбрасывать состояние фокуса в false.
  useClickAway(refInput, () => setFocused(false))

  // api/products/search - поиск продуктов в хедере search
  useDebounce(
    () => {
      Api.products
        .search(searchValue)
        .then((response) => setProducts(response))
        .catch((e) => console.log(e))
    },
    350,
    [searchValue],
  )

  const onClickItem = () => {
    setFocused(false)
    setSearchValue('')
  }

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
          value={searchValue}
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              'absolute flex flex-col gap-1 w-full top-14 py-2 bg-white rounded-xl shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12',
            )}
          >
            {products.map((product) => (
              <Link
                href={`/product/${product.slug}`}
                key={product.id}
                className='flex items-center gap-3 hover:bg-primary/10 px-2'
                onClick={onClickItem}
                scroll={false}
              >
                <img
                  src={product.variants[0]?.imageUrl}
                  alt={product.name}
                  className='size-8 rounded-sm'
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
