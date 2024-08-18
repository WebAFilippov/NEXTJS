import { Container, Filters, TopBar } from '@/components/shared'
import { ProductGroupList } from '@/components/shared/product'
import { prisma } from '@/prisma/prisma-client'
import { Suspense } from 'react'

export default async function Page() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          variants: true,
          defaultIngredients: true,
        },
      },
    },
  })

  return (
    <div>
      {/* Sticky top bar */}
      <TopBar categories={categories.filter(({ products }) => products.length > 0)} />

      <Container className='flex gap-10 mb-32 mt-9'>
        {/* Filter */}
        <div className='w-[250px]'>
          <Suspense>
            <Filters />
          </Suspense>
        </div>

        {/* Список продуктов */}
        <data className='flex-1'>
          <div className='flex flex-col gap-[60px]'>
            {categories.map(
              (category) =>
                category.products.length > 0 && (
                  <ProductGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    products={category.products}
                  />
                ),
            )}
          </div>
        </data>
      </Container>
    </div>
  )
}

