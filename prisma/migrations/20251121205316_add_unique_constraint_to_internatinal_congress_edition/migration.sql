/*
  Warnings:

  - A unique constraint covering the columns `[edition]` on the table `congresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "congresses_edition_key" ON "congresses"("edition");
