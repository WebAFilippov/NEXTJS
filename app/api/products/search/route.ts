import { prisma } from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get("query") ?? ""

  const products = await prisma.product.findMany()
  const filteredPoducts = products.filter(product => product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))

  console.log(filteredPoducts)

  return NextResponse.json({})
}


