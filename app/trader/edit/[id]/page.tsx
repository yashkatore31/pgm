"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTraderPage() {
  const router = useRouter();
  const { id } = useParams();
  const traderId = id as string;

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrader() {
      try {
        const res = await fetch(`/api/trader/edit/${traderId}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();

        setName(data.name || "");
        setPhoneNumber(data.phoneNumber || "");
        setCompanyName(data.companyName || "");
        setAddress(data.address || "");
      } catch (err) {
        setError("Failed to load trader data.");
      } finally {
        setLoading(false);
      }
    }

    if (traderId) fetchTrader();
  }, [traderId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !phoneNumber) {
      setError("Name and phone number are required.");
      return;
    }

    const res = await fetch(`/api/trader/edit/${traderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phoneNumber, companyName, address }),
    });

    if (res.ok) {
      router.push("/trader");
    } else {
      setError("Failed to update trader.");
    }
  };

  if (loading) {
    return <p className="p-4 text-gray-600">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-2 sm:px-4 py-6 sm:py-12">
      <div className="w-full max-w-md sm:max-w-lg border rounded-lg shadow-md p-4 sm:p-6 border-gray-300 bg-white">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Edit Trader
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-base">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-base"
              placeholder="Full Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-base"
              placeholder="10-digit number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-base"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-base"
              placeholder="Optional"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 via-pink-600 to-red-600 text-white py-2 px-4 rounded-md font-semibold hover:opacity-90"
          >
            Update Trader
          </button>
        </form>
      </div>
    </div>
  );
}
