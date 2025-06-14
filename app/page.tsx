'use client';

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-4">
      <p>hi</p>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
<p>Welcome, {session?.user?.name}</p>
    </div>
  );
}



