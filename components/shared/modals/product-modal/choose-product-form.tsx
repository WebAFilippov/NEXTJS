'use client'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui'
import { ProductWithVariantsIngredients } from '@/@types'
import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ProductForm } from './product-form'

interface Props {
  product: ProductWithVariantsIngredients
  className?: string
}

export const ChooseProductForm: React.FC<Props> = ({ product, className }) => {
  const router = useRouter()

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogTitle></DialogTitle>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}
      >
        <ProductForm product={product} onOpenChange={() => router.back()} />
      </DialogContent>
    </Dialog>
  )
}
