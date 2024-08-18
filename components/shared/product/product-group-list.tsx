'use client'
import React, { useEffect, useRef } from 'react'
import { Title } from '@/components/shared'
import { cn } from '@/shared/lib/utils'
import { useIntersection } from 'react-use'
import { setActiveId } from '@/shared/store/category'
import { ProductWithVariantsIngredients } from '@/@types'
import { ProductCard } from './product-card'

interface Props {
  title: string
  products?: ProductWithVariantsIngredients[]
  categoryId: number
  className?: string
  listClassName?: string
}

export const ProductGroupList: React.FC<Props> = ({ title, products, categoryId, className }) => {
  // Отслеживания положения экрана и отображение active в category Topbar
  // const intersectionRef = useRef(null)
  // const intersection = useIntersection(intersectionRef, {
  //   threshold: 0.4,
  // })

  // useEffect(() => {
  //   if (intersection?.isIntersecting) {
  //     setActiveId(categoryId)
  //   }
  // }, [intersection?.isIntersecting, categoryId])

  return (
    <section className={cn('flex flex-col', className)} id={title}>
      <Title
        text={title}
        className='font-semibold text-[36px] leading-[50px] text-black w-full my-8'
      />

      <div className='grid grid-cols-3 gap-x-8 gap-y-[60px]'>
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            slug={product.slug}
            name={product.name}
            price={product.variants[0]?.price}
            description={product.description}
            imageUrl={product.variants[0]?.imageUrl}
            ingredients={product.defaultIngredients}
          />
        ))}
      </div>
    </section>
  )
}
