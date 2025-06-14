import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper to extract ID from the URL
function getIdFromUrl(req: NextRequest): number | null {
  const urlParts = req.nextUrl.pathname.split("/");
  const id = urlParts[urlParts.length - 1];
  return isNaN(Number(id)) ? null : Number(id);
}

// GET a trader by ID
export async function GET(req: NextRequest) {
  try {
    const id = getIdFromUrl(req);
    if (id === null) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const trader = await prisma.trader.findUnique({
      where: { id },
    });

    if (!trader) {
      return NextResponse.json({ error: "Trader not found" }, { status: 404 });
    }

    return NextResponse.json(trader);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch trader" },
      { status: 500 }
    );
  }
}

// PUT update a trader by ID
export async function PUT(req: NextRequest) {
  try {
    const id = getIdFromUrl(req);
    if (id === null) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();
    const { name, phoneNumber, companyName, address } = body;

    const updatedTrader = await prisma.trader.update({
      where: { id },
      data: {
        name,
        phoneNumber,
        companyName: companyName || null,
        address: address || null,
      },
    });

    return NextResponse.json(updatedTrader);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update trader" },
      { status: 500 }
    );
  }
}
