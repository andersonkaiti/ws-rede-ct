/*
  Warnings:

  - You are about to drop the column `description` on the `team_members` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `teams` table. All the data in the column will be lost.
  - Added the required column `role` to the `team_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team_members" DROP COLUMN "description",
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "description",
ADD COLUMN     "type" TEXT NOT NULL;
