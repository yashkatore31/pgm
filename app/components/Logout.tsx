'use client';

import { signOut, useSession } from "next-auth/react";

export default function Logout() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-4">
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="px-4 py-2  bg-gradient-to-r from-orange-500 via-pink-600 to-red-600 text-white font-semibold rounded"
      >
        Logout
      </button>
    </div>
  );
}



