import { ChooseProductForm } from '@/components/shared/modals/product-modal'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  params: {
    slug: string
  }
}

const ModalProductPage: React.FC<Props> = async ({ params: { slug } }) => {
  const product = await prisma.product.findFirst({
    where: { slug: slug },
    include: {
      variants: true,
      defaultIngredients: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return <ChooseProductForm product={product} />
}

export default ModalProductPage
