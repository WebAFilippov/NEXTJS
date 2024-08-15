'use client'

import React, { useEffect, useRef } from 'react'
import { ProductCard, Title } from '@/components/shared'
import { cn } from '@/shared/lib/utils'
import { useIntersection } from 'react-use'
import { setActiveId } from '@/shared/store/category'
import { ProductWithVariantsIngredients } from '@/@types'

interface Props {
  title: string
  products?: ProductWithVariantsIngredients[]
  categoryId: number
  className?: string
  listClassName?: string
}

export const ProductGroupList: React.FC<Props> = ({ title, products, categoryId, className }) => {
  // Отслеживания положения экрана и отображение active в category Topbar
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveId(categoryId)
    }
  }, [intersection?.isIntersecting, categoryId])

  return (
    <section className={cn('flex flex-col gap-10', className)} ref={intersectionRef} id={title}>
      <Title text={title} size='lg' className='font-extrabold w-full' />

      <div className='grid grid-cols-3 gap-14'>
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
