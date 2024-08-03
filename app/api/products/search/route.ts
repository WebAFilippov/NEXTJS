import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get('search') ?? ''

  const products = await prisma.product.findMany()
  const filteredPoducts = products
    .filter((product) => product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    .slice(0, 5)

  return NextResponse.json(filteredPoducts)
}
