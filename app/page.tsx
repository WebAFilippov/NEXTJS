import { Container, Filters, Title, TopBar } from "@/components/shared"
import { ProductGroupList } from "@/components/shared/product-group-list"

export default function Page() {
  return (
    <>
      <div>
        <Container className="mt-10">
          <Title text="Все пиццы" size="lg" className="font-extrabold" />
        </Container>

        <TopBar />

        <Container className="flex gap-[60px] pb-14 mt-9">
          {/* Filter */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* List Goods */}
          <data className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductGroupList
                title="Пицца"
                categoryId={1}
                products={[
                  {
                    id: 0,
                    name: "Сырная 🌱👶",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D6108E3A1C9952CD3A7F39A4D02.avif",
                    variant: [{ price: 500 }],
                  },
                  {
                    id: 1,
                    name: "Сырная 🌱👶",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D6108E3A1C9952CD3A7F39A4D02.avif",
                    variant: [{ price: 500 }],
                  },
                  {
                    id: 2,
                    name: "Сырная 🌱👶",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D6108E3A1C9952CD3A7F39A4D02.avif",
                    variant: [{ price: 500 }],
                  },
                  {
                    id: 3,
                    name: "Сырная 🌱👶",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D6108E3A1C9952CD3A7F39A4D02.avif",
                    variant: [{ price: 500 }],
                  },
                ]}
              />

              <ProductGroupList
                title="Комбо"
                categoryId={2}
                products={[
                  {
                    id: 0,
                    name: "Омлет с беконом",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif",
                    variant: [{ price: 500 }],
                  },
                  {
                    id: 1,
                    name: "Омлет с беконом",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif",
                    variant: [{ price: 500 }],
                  },
                  {
                    id: 2,
                    name: "Омлет с беконом",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif",
                    variant: [{ price: 500 }],
                  },
                  {
                    id: 3,
                    name: "Омлет с беконом",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif",
                    variant: [{ price: 500 }],
                  },
                ]}
              />
            </div>
          </data>
        </Container>
      </div>
    </>
  )
}

