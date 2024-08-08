'use client'

import React, { useEffect, useRef } from 'react'
import { ProductCard, Title } from '@/components/shared'
import { cn } from '@/shared/lib/utils'
import { useIntersection } from 'react-use'
import { setActiveId } from '@/shared/store/category'
import { ProductWithVariantsIngredients } from '@/@types'

interface Props {
  title: string
  products: ProductWithVariantsIngredients[]
  categoryId: number
  className?: string
  listClassName?: string
}

export const ProductGroupList: React.FC<Props> = ({
  title,
  products,
  categoryId,
  className,
  listClassName,
}) => {
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
    <div className={className} ref={intersectionRef} id={title}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variants[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  )
}
