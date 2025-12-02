-- CreateTable
CREATE TABLE "scientific_journals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "issn" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo_url" TEXT,
    "journal_url" TEXT NOT NULL,
    "directors" TEXT,
    "editorial_board" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scientific_journals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "scientific_journal_id" ON "scientific_journals"("id");
