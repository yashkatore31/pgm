"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTraderPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !phoneNumber) {
      setError("Name and phone number are required.");
      return;
    }

    const res = await fetch("/api/trader", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phoneNumber, companyName, address }),
    });

    if (res.ok) {
      router.push("/trader");
    } else {
      setError("Failed to create trader.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-2 sm:px-4 py-6 sm:py-12">
      <div className="w-full max-w-md sm:max-w-lg border rounded-lg shadow-md p-4 sm:p-6 bg-white border-gray-300">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New Trader
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
            Save Trader
          </button>
        </form>
      </div>
    </div>
  );
}
