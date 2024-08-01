import { hashSync } from "bcrypt"
import { prisma } from "./prisma-client"
import { categories, ingredients, products } from "./constants"

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

  
}

const down = async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
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