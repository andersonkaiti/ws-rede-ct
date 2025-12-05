-- CreateTable
CREATE TABLE "scientific_articles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "journal" TEXT,
    "volume" TEXT,
    "edition" TEXT,
    "page_start" INTEGER,
    "page_end" INTEGER,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "publisher" TEXT,
    "description" TEXT,
    "year" INTEGER,
    "access_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scientific_articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "scientific_article_id" ON "scientific_articles"("id");
