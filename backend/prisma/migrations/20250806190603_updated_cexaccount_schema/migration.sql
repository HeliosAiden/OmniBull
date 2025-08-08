-- AlterTable
ALTER TABLE "public"."CexAccount" ADD COLUMN     "permissions" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ALTER COLUMN "apiSecret" DROP NOT NULL;
