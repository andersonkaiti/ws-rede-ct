/*
  Warnings:

  - The `status` column on the `pendencies` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PendencyStatus" AS ENUM ('PENDING', 'PAID');

-- AlterTable
ALTER TABLE "pendencies" DROP COLUMN "status",
ADD COLUMN     "status" "PendencyStatus" NOT NULL DEFAULT 'PENDING';
