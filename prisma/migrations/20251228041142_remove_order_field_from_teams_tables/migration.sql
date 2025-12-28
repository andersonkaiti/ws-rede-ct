/*
  Warnings:

  - You are about to drop the column `order` on the `legitimator_committee_members` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `management_team_members` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `sdhc_team_members` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "legitimator_committee_members" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "management_team_members" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "sdhc_team_members" DROP COLUMN "order";
