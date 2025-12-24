/*
  Warnings:

  - Added the required column `updated_at` to the `international_scientific_congress_galleries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `international_scientific_congress_partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `regional_congress_galleries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `regional_congress_partners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "international_scientific_congress_galleries" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "international_scientific_congress_partners" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "regional_congress_galleries" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "regional_congress_partners" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
