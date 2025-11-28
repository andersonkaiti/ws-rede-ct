/*
  Warnings:

  - You are about to drop the `congress_galleries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `congress_partners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `congresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "congress_galleries" DROP CONSTRAINT "congress_galleries_congress_id_fkey";

-- DropForeignKey
ALTER TABLE "congress_partners" DROP CONSTRAINT "congress_partners_congress_id_fkey";

-- DropTable
DROP TABLE "congress_galleries";

-- DropTable
DROP TABLE "congress_partners";

-- DropTable
DROP TABLE "congresses";

-- CreateTable
CREATE TABLE "international_scientific_congresses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "edition" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "congress_link" TEXT,
    "general_notice_url" TEXT,
    "schedule_document_url" TEXT,
    "program_document_url" TEXT,
    "admin_report_document_url" TEXT,
    "proceedings_document_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "international_scientific_congresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "international_scientific_congress_partners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT,
    "congress_id" TEXT NOT NULL,

    CONSTRAINT "international_scientific_congress_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "international_scientific_congress_galleries" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "caption" TEXT,
    "congress_id" TEXT NOT NULL,

    CONSTRAINT "international_scientific_congress_galleries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regional_congresses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "edition" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "congress_link" TEXT,
    "notice_url" TEXT,
    "schedule_url" TEXT,
    "program_url" TEXT,
    "admin_report_url" TEXT,
    "proceedings_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regional_congresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regional_congress_partners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT,
    "congress_id" TEXT NOT NULL,

    CONSTRAINT "regional_congress_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regional_congress_galleries" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "caption" TEXT,
    "congress_id" TEXT NOT NULL,

    CONSTRAINT "regional_congress_galleries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "international_scientific_congresses_edition_key" ON "international_scientific_congresses"("edition");

-- CreateIndex
CREATE INDEX "congress_edition" ON "international_scientific_congresses"("edition");

-- CreateIndex
CREATE INDEX "international_scientific_congress_partners_congress_id_idx" ON "international_scientific_congress_partners"("congress_id");

-- CreateIndex
CREATE INDEX "international_scientific_congress_galleries_congress_id_idx" ON "international_scientific_congress_galleries"("congress_id");

-- CreateIndex
CREATE UNIQUE INDEX "regional_congresses_edition_key" ON "regional_congresses"("edition");

-- CreateIndex
CREATE INDEX "regional_congress_edition" ON "regional_congresses"("edition");

-- CreateIndex
CREATE INDEX "regional_congress_partners_congress_id_idx" ON "regional_congress_partners"("congress_id");

-- CreateIndex
CREATE INDEX "regional_congress_galleries_congress_id_idx" ON "regional_congress_galleries"("congress_id");

-- AddForeignKey
ALTER TABLE "international_scientific_congress_partners" ADD CONSTRAINT "international_scientific_congress_partners_congress_id_fkey" FOREIGN KEY ("congress_id") REFERENCES "international_scientific_congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "international_scientific_congress_galleries" ADD CONSTRAINT "international_scientific_congress_galleries_congress_id_fkey" FOREIGN KEY ("congress_id") REFERENCES "international_scientific_congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regional_congress_partners" ADD CONSTRAINT "regional_congress_partners_congress_id_fkey" FOREIGN KEY ("congress_id") REFERENCES "regional_congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regional_congress_galleries" ADD CONSTRAINT "regional_congress_galleries_congress_id_fkey" FOREIGN KEY ("congress_id") REFERENCES "regional_congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
