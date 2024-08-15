import { prisma } from '@/prisma/prisma-client'
import { Ingredient } from '@prisma/client'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const ingredients = await prisma.ingredient.findMany()

  const uniqueIngredients = ingredients.reduce((acc: Ingredient[], current) => {
    const exists = acc.some((item) => item.name === current.name)

    if (!exists) {
      acc.push(current)
    }
    return acc
  }, [])

  return NextResponse.json(uniqueIngredients)
}
