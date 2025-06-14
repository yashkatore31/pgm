// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { phoneNumber: "9130843198" },
  });

  if (existingUser) {
    console.log("✅ User already exists. Skipping seed.");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin", 10);

  const user = await prisma.user.create({
    data: {
      name: "Yash Katore",
      phoneNumber: "9130843198",
      password: hashedPassword,
    },
  });

  console.log("✅ Seeded user:", user);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
