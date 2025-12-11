-- CreateEnum
CREATE TYPE "RedeCTHighlightType" AS ENUM ('PERSON', 'INSTITUTION');

-- CreateTable
CREATE TABLE "redect_highlights" (
    "id" TEXT NOT NULL,
    "type" "RedeCTHighlightType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "honorable_mention" TEXT,
    "image_url" TEXT,
    "honored_at" TIMESTAMP(3) NOT NULL,
    "merit_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "redect_highlights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "redect_highlight_id" ON "redect_highlights"("id");
