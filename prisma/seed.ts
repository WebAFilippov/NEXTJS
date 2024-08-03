import { hashSync } from "bcrypt"
import { prisma } from "./prisma-client"
import { categories, ingredients, products } from "./constants"
import { Prisma } from "@prisma/client"

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductVariant = ({ productId, size, type }: { productId: number, size?: number, type?: number }) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    size,
    type
  } as Prisma.ProductVariantUncheckedCreateInput
}

const up = async () => {
  await prisma.user.createMany({
    data: [
      {
        fullName: "Alex",
        email: "user@a.com",
        password: hashSync("11111111", 10),
        role: "USER",
        verified: new Date(),
      },
      {
        fullName: "Admin",
        email: "admin@a.com",
        password: hashSync("11111111", 10),
        role: "ADMIN",
        verified: new Date(),
      }
    ]
  })

  await prisma.category.createMany({
    data: categories
  })

  await prisma.ingredient.createMany({
    data: ingredients
  })

  await prisma.product.createMany({
    data: products
  })

  const pizza_1 = await prisma.product.create({
    data: {
      name: "Сырная 🌱👶",
      imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5)
      }
    }
  })

  const pizza_2 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10)
      }
    }
  })

  const pizza_3 = await prisma.product.create({
    data: {
      name: "Двойной цыпленок 👶",
      imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 20)
      }
    }
  })

  await prisma.productVariant.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductVariant({ productId: pizza_1.id, type: 1, size: 20 }),
      generateProductVariant({ productId: pizza_1.id, type: 2, size: 30 }),
      generateProductVariant({ productId: pizza_1.id, type: 2, size: 40 }),

      // Пицца "Сырная"
      generateProductVariant({ productId: pizza_2.id, type: 1, size: 20 }),
      generateProductVariant({ productId: pizza_2.id, type: 1, size: 30 }),
      generateProductVariant({ productId: pizza_2.id, type: 1, size: 40 }),
      generateProductVariant({ productId: pizza_2.id, type: 2, size: 20 }),
      generateProductVariant({ productId: pizza_2.id, type: 2, size: 30 }),
      generateProductVariant({ productId: pizza_2.id, type: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateProductVariant({ productId: pizza_3.id, type: 1, size: 20 }),
      generateProductVariant({ productId: pizza_3.id, type: 2, size: 30 }),
      generateProductVariant({ productId: pizza_3.id, type: 2, size: 40 }),

      // Остальные продукты
      generateProductVariant({ productId: 1 }),
      generateProductVariant({ productId: 2 }),
      generateProductVariant({ productId: 3 }),
      generateProductVariant({ productId: 4 }),
      generateProductVariant({ productId: 5 }),
      generateProductVariant({ productId: 6 }),
      generateProductVariant({ productId: 7 }),
      generateProductVariant({ productId: 8 }),
      generateProductVariant({ productId: 9 }),
      generateProductVariant({ productId: 10 }),
      generateProductVariant({ productId: 11 }),
      generateProductVariant({ productId: 12 }),
      generateProductVariant({ productId: 13 }),
      generateProductVariant({ productId: 14 }),
      generateProductVariant({ productId: 15 }),
      generateProductVariant({ productId: 16 }),
      generateProductVariant({ productId: 17 }),
    ]
  })

  await prisma.basket.createMany({
    data: [
      {
        userId: 1,
        token: "111111",
        totalAmount: 0,
      },
      {
        userId: 2,
        token: "222222",
        totalAmount: 0,
      }
    ]
  })

  await prisma.basketProduct.create({
    data:
    {
      basketId: 1,
      productVariantId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    }
  })
}

const down = async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Basket" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "BasketProduct" RESTART IDENTITY CASCADE`
}

const main = async () => {
  try {
    await down()
    await up()
  } catch (error) {
    console.error(error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })