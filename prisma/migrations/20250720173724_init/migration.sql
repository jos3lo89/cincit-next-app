-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMINISTRATOR', 'PARTICIPANT', 'INSCRIBER');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "dni" CHAR(8),
    "name" VARCHAR(50),
    "lastname" VARCHAR(50),
    "email" VARCHAR(50) NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "phone" VARCHAR(9),
    "institution" VARCHAR(50),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'PARTICIPANT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cincit_edition" (
    "id" INTEGER NOT NULL,
    "year" CHAR(4) NOT NULL,

    CONSTRAINT "cincit_edition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_type" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(9) NOT NULL,

    CONSTRAINT "attendance_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_state" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(7) NOT NULL,

    CONSTRAINT "attendance_state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" SERIAL NOT NULL,
    "cincit_edition_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendance_type_id" INTEGER NOT NULL,
    "attendance_state_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_attendance" (
    "user_id" TEXT NOT NULL,
    "attendance_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_attendance_pkey" PRIMARY KEY ("user_id","attendance_id")
);

-- CreateTable
CREATE TABLE "inscription_state" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(9) NOT NULL,

    CONSTRAINT "inscription_state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscription_type" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(10) NOT NULL,

    CONSTRAINT "inscription_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucher" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscription" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "inscription_type_id" INTEGER NOT NULL,
    "voucher_id" INTEGER NOT NULL,
    "state_id" INTEGER NOT NULL DEFAULT 1,
    "cincit_edition_id" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_dni_key" ON "user"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_providerAccountId_key" ON "account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "session_sessionToken_key" ON "session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "cincit_edition_year_key" ON "cincit_edition"("year");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_type_name_key" ON "attendance_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_state_name_key" ON "attendance_state"("name");

-- CreateIndex
CREATE UNIQUE INDEX "inscription_state_name_key" ON "inscription_state"("name");

-- CreateIndex
CREATE UNIQUE INDEX "inscription_type_name_key" ON "inscription_type"("name");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_cincit_edition_id_fkey" FOREIGN KEY ("cincit_edition_id") REFERENCES "cincit_edition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_attendance_type_id_fkey" FOREIGN KEY ("attendance_type_id") REFERENCES "attendance_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_attendance_state_id_fkey" FOREIGN KEY ("attendance_state_id") REFERENCES "attendance_state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_attendance" ADD CONSTRAINT "user_attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_attendance" ADD CONSTRAINT "user_attendance_attendance_id_fkey" FOREIGN KEY ("attendance_id") REFERENCES "attendance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscription" ADD CONSTRAINT "inscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscription" ADD CONSTRAINT "inscription_inscription_type_id_fkey" FOREIGN KEY ("inscription_type_id") REFERENCES "inscription_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscription" ADD CONSTRAINT "inscription_voucher_id_fkey" FOREIGN KEY ("voucher_id") REFERENCES "voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscription" ADD CONSTRAINT "inscription_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "inscription_state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscription" ADD CONSTRAINT "inscription_cincit_edition_id_fkey" FOREIGN KEY ("cincit_edition_id") REFERENCES "cincit_edition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
