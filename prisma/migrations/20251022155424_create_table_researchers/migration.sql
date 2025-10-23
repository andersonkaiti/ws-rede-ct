/*
  Warnings:

  - You are about to drop the column `userId` on the `certifications` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `pendencies` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `certifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `pendencies` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Seniority" AS ENUM ('SENIOR', 'RESEARCHER', 'JUNIOR', 'HONOR');

-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('DOCTOR', 'MASTER', 'BACHELOR', 'TECHNICAL', 'POSTGRADUATE');

-- DropForeignKey
ALTER TABLE "certifications" DROP CONSTRAINT "certifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "pendencies" DROP CONSTRAINT "pendencies_userId_fkey";

-- AlterTable
ALTER TABLE "certifications" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pendencies" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "researchers" (
    "id" TEXT NOT NULL,
    "registration_number" TEXT NOT NULL,
    "main_etps" TEXT,
    "formations" TEXT,
    "degrees" "Degree"[],
    "occupations" TEXT NOT NULL,
    "seniority" "Seniority" NOT NULL,
    "institutions" TEXT NOT NULL,
    "biography" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "researchers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendencies" ADD CONSTRAINT "pendencies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "researchers" ADD CONSTRAINT "researchers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
