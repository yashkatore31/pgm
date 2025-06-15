import React from "react";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-5 mb-2 px-4 sm:px-6 lg:pt-8 max-w-screen-lg mx-auto">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-500 via-pink-600 to-red-600 text-transparent bg-clip-text">
        PGM
      </h1>
      <span className="text-lg sm:text-xl font-mono tracking-tight">
        flowers
      </span>
      <p className="text-base md:text-sm opacity-60">
        Pankaj Gulab Malunjkar
      </p>
    </div>
  );
}
