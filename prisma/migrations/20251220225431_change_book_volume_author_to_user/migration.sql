/*
  Warnings:

  - You are about to drop the column `author` on the `book_volumes` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `book_volumes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "book_volumes" DROP COLUMN "author",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "book_volumes" ADD CONSTRAINT "book_volumes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
