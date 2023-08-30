/*
  Warnings:

  - You are about to drop the column `productID` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productID_fkey";

-- DropIndex
DROP INDEX "Review_productID_key";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "productID",
DROP COLUMN "text",
DROP COLUMN "user",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Review_productId_key" ON "Review"("productId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
