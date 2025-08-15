/*
  Warnings:

  - You are about to drop the column `amount` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `voucher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "voucher" DROP COLUMN "amount",
DROP COLUMN "path",
ADD COLUMN     "imgId" TEXT,
ADD COLUMN     "url" TEXT,
ADD COLUMN     "urlfull" TEXT;
