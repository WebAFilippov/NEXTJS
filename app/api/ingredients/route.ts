import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const ingredients = await prisma.ingredient.findMany()

  return NextResponse.json(ingredients)
}
