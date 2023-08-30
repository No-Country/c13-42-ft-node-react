-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILURE');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
