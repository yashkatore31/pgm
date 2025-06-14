"use client";

import Link from "next/link";

export function HomeCard() {
  const items = [
    {
      title: "trader",
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
      href: "/patti",
    },
  ];

  return (
    <div className="px-4 py-4">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link key={item.title} href={item.href}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 p-6 cursor-pointer border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
