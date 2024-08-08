import { Container, Filters, Title, TopBar } from '@/components/shared'
import { ProductGroupList } from '@/components/shared/product-group-list'
import { prisma } from '@/prisma/prisma-client'
import { Suspense } from 'react'

export default async function Page() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          variants: true,
          ingredients: true,
        },
      },
    },
  })

  return (
    <>
      <div>
        <Container className='mt-10'>
          <Title text='Все пиццы' size='lg' className='font-extrabold' />
        </Container>

        <TopBar categories={categories.filter((category) => category.products.length > 0)} />

        <Container className='flex gap-[60px] pb-14 mt-9'>
          {/* Filter */}
          <div className='w-[250px]'>
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список продуктов */}
          <data className='flex-1'>
            <div className='flex flex-col gap-16'>
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
    </>
  )
}

