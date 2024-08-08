import { ProductWithVariantsIngredients } from '@/@types'
import React from 'react'
import { GoodsProduct } from '../../goods-product'

interface Props {
  product: ProductWithVariantsIngredients
  onOpenChange: () => void
  className?: string
}

export const ProductForm: React.FC<Props> = ({ product, onOpenChange, className }) => {
  const isPizza = Boolean(product.variants[0].type)
  console.log(isPizza)

  if (isPizza) {
    return null
  }

  return (
    <div className={className}>
      <GoodsProduct product={product} onOpenChange={onOpenChange} />
    </div>
  )
}
