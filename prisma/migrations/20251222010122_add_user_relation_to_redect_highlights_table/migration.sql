/*
  Warnings:

  - You are about to drop the column `image_url` on the `redect_highlights` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `redect_highlights` table. All the data in the column will be lost.
  - The `honorable_mention` column on the `redect_highlights` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `user_id` to the `redect_highlights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "redect_highlights" DROP COLUMN "image_url",
DROP COLUMN "name",
ADD COLUMN     "user_id" TEXT NOT NULL,
DROP COLUMN "honorable_mention",
ADD COLUMN     "honorable_mention" BOOLEAN DEFAULT false;

-- AddForeignKey
ALTER TABLE "redect_highlights" ADD CONSTRAINT "redect_highlights_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
