import { ProductFull } from '@/@types'
import { ModalProduct } from '@/components/shared/modals/product-modal'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  params: {
    slug: string
  }
}

const Page: React.FC<Props> = async ({ params: { slug } }) => {
  const product = await prisma.product.findFirst({
    where: { slug: slug },
    include: {
      variants: {
        include: {
          detailInfo: true,
          ingredients: true,
        },
      },
      defaultIngredients: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return <ModalProduct product={product as ProductFull} />
}

export default Page
