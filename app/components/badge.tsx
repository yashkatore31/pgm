"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


export default function ProfileBadge() {
  const [userInitial, setUserInitial] = useState("U");
  useEffect(() => {
    const userName = "Yash Katore"; // or get it from session/user context
    if (userName) {
      setUserInitial(userName.charAt(0).toUpperCase());
    }
  }, []);

  return (
    <div className="fixed right-4 z-50">
        <Link key={"../profile"} href={"../profile"}>
      <div className="w-10 h-10 bg-gray-300  text-gray-100 rounded-full flex items-center justify-center border border-gray-300 shadow-lg font-semibold">
        P
      </div>
       </Link>
    </div>
  );
}
