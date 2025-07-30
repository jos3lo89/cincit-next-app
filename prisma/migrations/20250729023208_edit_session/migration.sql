/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Made the column `dni` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `institution` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropIndex
DROP INDEX "VerificationToken_email_token_key";

-- DropIndex
DROP INDEX "VerificationToken_token_key";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "dni" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "lastname" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "institution" SET NOT NULL;

-- DropTable
DROP TABLE "account";

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_key" ON "VerificationToken"("email");
