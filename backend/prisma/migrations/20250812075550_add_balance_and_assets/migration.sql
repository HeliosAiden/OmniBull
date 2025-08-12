/*
  Warnings:

  - Made the column `exchangeId` on table `CexAccount` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."CexAccount" DROP CONSTRAINT "CexAccount_exchangeId_fkey";

-- AlterTable
ALTER TABLE "public"."CexAccount" ADD COLUMN     "passphrase" TEXT,
ALTER COLUMN "exchangeId" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Exchange" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "public"."Balance" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "totalEqUsd" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Asset" (
    "id" TEXT NOT NULL,
    "balanceId" TEXT NOT NULL,
    "ccy" TEXT NOT NULL,
    "availBal" DOUBLE PRECISION NOT NULL,
    "frozenBal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "eqUsd" DOUBLE PRECISION NOT NULL,
    "exchangeId" TEXT,
    "uTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Balance_accountId_key" ON "public"."Balance"("accountId");

-- CreateIndex
CREATE INDEX "Asset_balanceId_idx" ON "public"."Asset"("balanceId");

-- CreateIndex
CREATE INDEX "Asset_ccy_idx" ON "public"."Asset"("ccy");

-- AddForeignKey
ALTER TABLE "public"."CexAccount" ADD CONSTRAINT "CexAccount_exchangeId_fkey" FOREIGN KEY ("exchangeId") REFERENCES "public"."Exchange"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Balance" ADD CONSTRAINT "Balance_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."CexAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Asset" ADD CONSTRAINT "Asset_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "public"."Balance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Asset" ADD CONSTRAINT "Asset_exchangeId_fkey" FOREIGN KEY ("exchangeId") REFERENCES "public"."Exchange"("id") ON DELETE SET NULL ON UPDATE CASCADE;
