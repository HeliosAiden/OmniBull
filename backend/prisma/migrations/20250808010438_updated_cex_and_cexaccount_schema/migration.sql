-- DropForeignKey
ALTER TABLE "public"."CexAccount" DROP CONSTRAINT "CexAccount_exchangeId_fkey";

-- AlterTable
ALTER TABLE "public"."CexAccount" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "exchangeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Exchange" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "immutable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "public"."CexAccount" ADD CONSTRAINT "CexAccount_exchangeId_fkey" FOREIGN KEY ("exchangeId") REFERENCES "public"."Exchange"("id") ON DELETE SET NULL ON UPDATE CASCADE;
