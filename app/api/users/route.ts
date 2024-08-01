import { prisma } from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
  const users = await prisma.user.findMany()

  return NextResponse.json(users)
}

export const POST = async (req: NextRequest) => {
  const { fullName, email, password } = await req.json()

  try {
    const user = await prisma.user.create({ data: { fullName, email, password } })
    return NextResponse.json(user)
  }
  catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
