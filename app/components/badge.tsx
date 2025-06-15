"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfileBadge() {
  const [userInitial, setUserInitial] = useState("U");

  useEffect(() => {
    const userName = "Pankaj Malunjkar"; // Ideally get this from session or props
    if (userName) {
      setUserInitial(userName.charAt(0).toUpperCase());
    }
  }, []);

  return (
    <div className="fixed right-4 top-4 z-50">
      <Link href="/profile">
        <div className="w-10 h-10 bg-gray-300 text-gray-100 rounded-full flex items-center justify-center border border-gray-300 shadow-lg font-semibold text-base">
          {userInitial}
        </div>
      </Link>
    </div>
  );
}
