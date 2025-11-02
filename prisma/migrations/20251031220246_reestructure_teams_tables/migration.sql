/*
  Warnings:

  - You are about to drop the `team_members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_team_id_fkey";

-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_user_id_fkey";

-- DropTable
DROP TABLE "team_members";

-- DropTable
DROP TABLE "teams";

-- CreateTable
CREATE TABLE "management_teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "management_teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "management_team_members" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "team_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "management_team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sdhc_team_members" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "sdhc_team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legitimator_committee_members" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "legitimator_committee_members_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "management_team_members" ADD CONSTRAINT "management_team_members_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "management_teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "management_team_members" ADD CONSTRAINT "management_team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sdhc_team_members" ADD CONSTRAINT "sdhc_team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legitimator_committee_members" ADD CONSTRAINT "legitimator_committee_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
