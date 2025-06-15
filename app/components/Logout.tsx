"use client";

import { signOut, useSession } from "next-auth/react";

export default function Logout() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-4 px-4">
      {session?.user && (
        <p className="text-base text-gray-700">
          Logged in as <span className="font-medium">{session.user.name || session.user.email}</span>
        </p>
      )}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="px-6 py-2 text-base bg-gradient-to-r from-orange-500 via-pink-600 to-red-600 text-white font-semibold rounded shadow hover:shadow-lg transition-all"
      >
        Logout
      </button>
    </div>
  );
}
