/*
  Warnings:

  - You are about to drop the column `attendance_state_id` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `attendance_type_id` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `cincit_edition_id` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `cincit_edition_id` on the `inscription` table. All the data in the column will be lost.
  - You are about to drop the column `inscription_type_id` on the `inscription` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `inscription` table. All the data in the column will be lost.
  - You are about to drop the `attendance_state` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attendance_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cincit_edition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inscription_state` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inscription_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `attendanceType` to the `attendance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CincitEdition" AS ENUM ('2025', '2026');

-- CreateEnum
CREATE TYPE "AttendanceType" AS ENUM ('entrance', 'exit');

-- CreateEnum
CREATE TYPE "AttendanceState" AS ENUM ('visible', 'hidden');

-- CreateEnum
CREATE TYPE "InscriptionState" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "InscriptionType" AS ENUM ('general');

-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_attendance_state_id_fkey";

-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_attendance_type_id_fkey";

-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_cincit_edition_id_fkey";

-- DropForeignKey
ALTER TABLE "inscription" DROP CONSTRAINT "inscription_cincit_edition_id_fkey";

-- DropForeignKey
ALTER TABLE "inscription" DROP CONSTRAINT "inscription_inscription_type_id_fkey";

-- DropForeignKey
ALTER TABLE "inscription" DROP CONSTRAINT "inscription_state_id_fkey";

-- AlterTable
ALTER TABLE "attendance" DROP COLUMN "attendance_state_id",
DROP COLUMN "attendance_type_id",
DROP COLUMN "cincit_edition_id",
ADD COLUMN     "attendanceState" "AttendanceState" NOT NULL DEFAULT 'hidden',
ADD COLUMN     "attendanceType" "AttendanceType" NOT NULL,
ADD COLUMN     "cincitEdition" "CincitEdition" NOT NULL DEFAULT '2025';

-- AlterTable
ALTER TABLE "inscription" DROP COLUMN "cincit_edition_id",
DROP COLUMN "inscription_type_id",
DROP COLUMN "state_id",
ADD COLUMN     "cincitEdition" "CincitEdition" NOT NULL DEFAULT '2025',
ADD COLUMN     "inscriptionType" "InscriptionType" NOT NULL DEFAULT 'general',
ADD COLUMN     "state" "InscriptionState" NOT NULL DEFAULT 'pending';

-- DropTable
DROP TABLE "attendance_state";

-- DropTable
DROP TABLE "attendance_type";

-- DropTable
DROP TABLE "cincit_edition";

-- DropTable
DROP TABLE "inscription_state";

-- DropTable
DROP TABLE "inscription_type";
