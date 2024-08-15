'use client'
import { ProductWithVariantsIngredients } from '@/@types'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'

interface Props {
  product: ProductWithVariantsIngredients
  onOpenChange: () => void
  className?: string
}

export const GoodsProduct: React.FC<Props> = ({ product, onOpenChange, className }) => {
  return (
    <div className={cn(className, 'flex flex-1 h-full')}>
      <div className='flex items-center justify-center flex-1 relative w-full'>
        <img
          src={product.variants[0].imageUrl}
          alt={product.name}
          className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'
        />
      </div>

      <div className='w-[490px] h-full bg-[#f7f6f5] p-7'>
        <Title text={product.name} size='md' className='font-extrabold mb-1' />

        <Button
          loading={false}
          onClick={() => onOpenChange()}
          className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
        >
          Добавить в корзину за {product.variants[0]?.price} ₽
        </Button>
      </div>
    </div>
  )
}
