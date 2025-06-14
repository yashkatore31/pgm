"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

type Trader = {
  id: number;
  name: string;
  phoneNumber: string;
  companyName?: string | null;
  address?: string | null;
};

export default function FarmersPage() {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTraders() {
      const res = await fetch("/api/trader");
      const data = await res.json();
      setTraders(data);
      setLoading(false);
    }

    fetchTraders();
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Traders</h1>
          <Link href="/trader/add">
            <button className="bg-gradient-to-r from-orange-500 via-pink-600 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">
              + Add Trader
            </button>
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading traders...</p>
        ) : traders.length === 0 ? (
          <p className="text-gray-600">No traders found.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {traders.map((t) => (
              <div
                key={t.id}
                className="relative border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                {/*icon in top-right corner */}
                <Link
                  href={`/trader/edit/${t.id}`}
                  className="absolute top-4 right-5 text-gray-400 hover:text-gray-600"
                >
                  <Pencil className="w-4 h-4" />
                </Link>

                <h2 className="text-lg font-semibold">{t.name}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  {t.companyName || "—"}
                </p>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {t.phoneNumber}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {t.address || "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
