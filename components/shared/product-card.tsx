'use client'
import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { DefaultIngredient } from '@prisma/client'
import { cn } from '@/shared/lib'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
  const onMouseEnter = () => {
    router.prefetch(`product/${slug}`)
  }

  return (
    <article className={cn(className)}>
      <Link
        onMouseEnter={onMouseEnter}
        href={`product/${slug}`}
        scroll={false}
        className='group flex flex-col justify-between h-full'
      >
        <div>
          {/* <div className='flex justify-center items-center h-[260px] rounded-lg'>
            <img
              src={imageUrl}
              alt={name}
              className='w-[215px] h-[215px] group-hover:mt-2 transition-all duration-150 ease-out'
            />
          </div> */}

          <div className='flex justify-center items-center'>
            <Image
              src={imageUrl}
              alt={name}
              width={215}
              height={215}
              className='relative top-0 group-hover:top-2 transition-all duration-150 ease-out'
            />
          </div>

          <Title text={name} size='xs' className='font-semibold my-3 px-1' />

          <p className='text-sm text-gray-400 px-1'>
            {ingredients.length > 0
              ? ingredients.map((ingredient) => ingredient.name).join(', ')
              : description}
          </p>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <span className='text-[20px] pl-1'>{price} ₽</span>

          <Button
            variant='secondary'
            className='font-bold bg-[#FEF1E6] text-primary px-2 py-5 min-w-[120px] max-w-[60%] flex-initial hover:bg-[#FDD4B4] mr-1 duration-200'
          >
            Выбрать
          </Button>
        </div>
      </Link>
    </article>
  )
}
