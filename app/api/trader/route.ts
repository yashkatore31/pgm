import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const trader = await prisma.trader.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(trader)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch traders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phoneNumber, companyName, address } = body

    const trader = await prisma.trader.create({
      data: {
        name,
        phoneNumber,
        companyName: companyName || null,
        address: address || null,
      },
    })

    return NextResponse.json(trader)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create trader" }, { status: 500 })
  }
}
