import { Container, GroupVariants, ProductImage, Title } from '@/components/shared'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import React from 'react'

const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } })

  if (!product) {
    return notFound()
  }

  return (
    <Container className='flex flex-col my-10 min-h-[500px]'>
      <div className='flex flex-1'>
        <ProductImage imageUrl={product.imageUrl} size={20} alt={product.name} />

        <div className='w-[490px] bg-[#fcfcfc] p-7'>
          <Title text={product.name} size='md' className='font-extrabold mb-1' />
          <p className='text-gray-400'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, rem?
          </p>

          <GroupVariants
            selectedVarintId={3}
            items={[
              {
                name: 'Маленькая',
                value: 1,
              },
              {
                name: 'Средняя',
                value: 2,
              },
              {
                name: 'Большая',
                value: 3,
                disabled: true,
              },
            ]}
          />
        </div>
      </div>
    </Container>
  )
}

export default ProductPage
