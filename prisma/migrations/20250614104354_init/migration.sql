-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('Cash', 'Bank', 'UPI');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Paid', 'Unpaid', 'Partial');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trader" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "companyName" VARCHAR(100),
    "address" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PattiReport" (
    "id" SERIAL NOT NULL,
    "traderId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "daagNumber" INTEGER NOT NULL,
    "commissionRate" DECIMAL(5,2) NOT NULL DEFAULT 10.0,
    "commission" DECIMAL(10,2) NOT NULL,
    "motorRent" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "cooliePerCaret" DECIMAL(10,2) NOT NULL DEFAULT 6.0,
    "jagaBhade" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "postage" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "caretCount" INTEGER NOT NULL,
    "totalSale" DECIMAL(10,2) NOT NULL,
    "expense" DECIMAL(10,2) NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL,
    "paymentMode" "PaymentMode" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PattiReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlowerDetail" (
    "id" SERIAL NOT NULL,
    "pattiReportId" INTEGER NOT NULL,
    "flowerName" VARCHAR(100) NOT NULL,
    "carets" INTEGER NOT NULL,
    "qtyPerCaret" DECIMAL(10,2) NOT NULL,
    "totalQty" DECIMAL(10,2) NOT NULL,
    "rate" DECIMAL(10,2) NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "FlowerDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "PattiReport" ADD CONSTRAINT "PattiReport_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "Trader"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowerDetail" ADD CONSTRAINT "FlowerDetail_pattiReportId_fkey" FOREIGN KEY ("pattiReportId") REFERENCES "PattiReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
