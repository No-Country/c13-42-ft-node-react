/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_type` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_title` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "type",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "product_type" TEXT NOT NULL,
ADD COLUMN     "sub_title" TEXT NOT NULL,
ALTER COLUMN "color" SET DEFAULT false,
ALTER COLUMN "size" SET DEFAULT true;
