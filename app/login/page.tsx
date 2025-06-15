"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Normalize phone number: remove leading +91 or 91
    
    const res = await signIn("credentials", {
      phoneNumber,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setError("Invalid phone number or password.");
    }
  }

  if (!mounted) return null;

  return (
    <div className="min-h-[100dvh] bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border rounded-lg shadow-sm my-6 border-gray-300 py-6 px-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Login to Your Account
          </h1>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-base">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+91XXXXXXXXXX"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-white font-semibold bg-gradient-to-r from-orange-500 via-pink-600 to-red-600 hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
