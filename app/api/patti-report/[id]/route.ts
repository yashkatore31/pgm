import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const report = await prisma.pattiReport.findUnique({
      where: { id: Number(params.id) },
      include: { flowers: true, trader: true },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found." }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch {
    return NextResponse.json({ error: "Failed to fetch report." }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
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
      flowers, // complete replacement
    } = data;

    const commission = ((commissionRate ?? 10) * Number(totalSale)) / 100;

    // Delete existing flowers
    await prisma.flowerDetail.deleteMany({ where: { pattiReportId: id } });

    const updated = await prisma.pattiReport.update({
      where: { id },
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
          create: flowers.map((flower: any) => ({
            flowerName: flower.flowerName,
            carets: flower.carets,
            qtyPerCaret: flower.qtyPerCaret,
            totalQty: flower.totalQty,
            rate: flower.rate,
            totalAmount: flower.totalAmount,
          })),
        },
      },
      include: { flowers: true, trader: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update report." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    // Delete flower details first (due to onDelete: Cascade, optional)
    await prisma.flowerDetail.deleteMany({ where: { pattiReportId: id } });

    await prisma.pattiReport.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete report." }, { status: 500 });
  }
}
