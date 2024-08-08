import { ChooseProductForm } from '@/components/shared/modals/product-modal'
import { prisma } from '@/prisma/prisma-client'

import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  params: {
    id: string
  }
  className?: string
}

const ModalProductPage: React.FC<Props> = async ({ params: { id }, className }) => {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      variants: true,
      ingredients: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return <ChooseProductForm product={product} />
}

export default ModalProductPage
