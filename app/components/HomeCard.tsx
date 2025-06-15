"use client";

import Link from "next/link";

export function HomeCard() {
  const items = [
    {
      title: "Trader",
      description: "Manage traders and farmers",
      href: "/trader",
    },
    {
      title: "Flowers",
      description: "Manage flower types and rates",
      href: "/flowers",
    },
    {
      title: "Patti",
      description: "Create and manage Patti reports",
      href: "/patti-report",
    },
  ];

  return (
    <div className="px-4 py-4">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link key={item.title} href={item.href} aria-label={`Go to ${item.title}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 p-6 cursor-pointer border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
