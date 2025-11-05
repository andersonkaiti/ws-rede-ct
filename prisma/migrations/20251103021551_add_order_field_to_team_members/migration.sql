-- AlterTable
ALTER TABLE "legitimator_committee_members" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "management_team_members" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "sdhc_team_members" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
