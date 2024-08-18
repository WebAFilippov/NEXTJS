'use client'

import React from 'react'
import { Title } from '../title'
import { Button } from '../../ui'
import { DefaultIngredient } from '@prisma/client'
import { cn } from '@/shared/lib'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  slug: string
  name: string
  price: number
  description: string | null
  imageUrl: string
  ingredients: DefaultIngredient[]
  className?: string
}

export const ProductCard: React.FC<Props> = ({
  slug,
  name,
  price,
  description,
  imageUrl,
  ingredients,
  className,
}) => {
  const router = useRouter()

  return (
    <article className={cn(className)}>
      <Link
        href={`product/${slug}`}
        scroll={false}
        prefetch={true}
        className='group flex flex-col justify-between h-full'
      >
        <div>
          <div className='flex justify-center items-center'>
            <Image
              src={imageUrl}
              alt={name}
              width={215}
              height={215}
              className='relative top-0 group-hover:top-2 transition-all duration-150 ease-out'
            />
          </div>

          <Title
            text={name}
            size='xs'
            className='my-3 px-1 text-[20px] leading-6 text-black font-medium font-dodo'
          />

          <p className='text-sm text-gray-500 px-1'>
            {ingredients.length > 0
              ? ingredients.map((ingredient) => ingredient.name).join(', ')
              : description}
          </p>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <span className='text-[20px] leading-[22px] text-black font-semibold font-dodo'>
            {price} ₽
          </span>

          <Button
            variant='secondary'
            className='bg-[#FEF1E6] text-[#e28644] font-bold text-[16px] leading-6 px-2 py-5 min-w-[120px] max-w-[60%] flex-initial hover:bg-[#FDD4B4] mr-1 duration-200 font-dodo'
          >
            В корзину
          </Button>
        </div>
      </Link>
    </article>
  )
}
