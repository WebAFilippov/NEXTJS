'use client'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui'
import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ProductFull } from '@/@types'
import { OthersCard, PizzaCard } from '../../product'

interface Props {
  product: ProductFull
  className?: string
}

export const ModalProduct: React.FC<Props> = ({ product, className }) => {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(Boolean(product))

  const isPizza = Boolean(product.variants[0]?.size)

  const onOpenChangeModal = () => {
    setOpenModal(false)
    router.back()
  }

  return (
    <Dialog open={openModal} onOpenChange={onOpenChangeModal}>
      <DialogTitle />
      <DialogContent
        aria-describedby={undefined}
        className={cn('p-0 min-h-[610px] bg-white w-[924px] rounded-[20px]', className)}
      >
        {isPizza ? (
          <PizzaCard product={product} onOpenChange={onOpenChangeModal} />
        ) : (
          <OthersCard product={product} onOpenChange={onOpenChangeModal} />
        )}
      </DialogContent>
    </Dialog>
  )
}
