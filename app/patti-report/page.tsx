// app/patti-report/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PattiReportPage() {
  const reports = await prisma.pattiReport.findMany({
    include: { trader: true, flowers: true },
    orderBy: { date: "desc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patti Reports</h1>
      <Link href="/patti-report/add" className="text-blue-500 underline">
        ➕ Add New Report
      </Link>

      <div className="mt-6 space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="border p-4 rounded shadow bg-white space-y-2"
          >
            <div>
              <strong>Date:</strong> {new Date(report.date).toLocaleDateString()}
            </div>
            <div>
              <strong>Trader:</strong> {report.trader.name}
            </div>
            <div>
              <strong>Carets:</strong> {report.caretCount}
            </div>
            <div>
              <strong>Total Sale:</strong> ₹{report.totalSale.toFixed(2)}
            </div>
            <div>
              <strong>Flowers:</strong>
              <ul className="list-disc pl-6">
                {report.flowers.map((flower) => (
                  <li key={flower.id}>
                    {flower.flowerName} - {flower.carets} carets @ ₹
                    {flower.rate.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
