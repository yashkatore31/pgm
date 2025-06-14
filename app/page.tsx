"use client";

import { signOut, useSession } from "next-auth/react";
import Hero from "./components/Hero";
import Badge from "./components/badge";
import { HomeCard } from "./components/HomeCard";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="">
      <Badge />
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <div className="mt-6">
          <HomeCard />
        </div>
      </div>
    </div>
  );
}
