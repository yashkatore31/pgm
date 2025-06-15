import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const reports = await prisma.pattiReport.findMany({
      include: {
        trader: true,
        flowers: true,
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reports." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      traderId,
      date,
      daagNumber,
      commissionRate,
      motorRent,
      cooliePerCaret,
      jagaBhade,
      postage,
      caretCount,
      totalSale,
      expense,
      balance,
      paymentMode,
      paymentStatus,
      paymentDate,
      flowers, // array of flower detail objects
    } = data;

    // Calculate commission
    const commission = ((commissionRate ?? 10) * Number(totalSale)) / 100;

    const report = await prisma.pattiReport.create({
      data: {
        traderId,
        date: new Date(date),
        daagNumber,
        commissionRate,
        commission,
        motorRent,
        cooliePerCaret,
        jagaBhade,
        postage,
        caretCount,
        totalSale,
        expense,
        balance,
        paymentMode,
        paymentStatus,
        paymentDate: paymentDate ? new Date(paymentDate) : null,
        flowers: {
          create: flowers?.map((flower: any) => ({
            flowerName: flower.flowerName,
            carets: flower.carets,
            qtyPerCaret: flower.qtyPerCaret,
            totalQty: flower.totalQty,
            rate: flower.rate,
            totalAmount: flower.totalAmount,
          })),
        },
      },
      include: {
        flowers: true,
        trader: true,
      },
    });

    return NextResponse.json(report);
  } catch (err) {
    console.error("PattiReport POST error:", err);
    return NextResponse.json({ error: "Failed to create report." }, { status: 500 });
  }
}
