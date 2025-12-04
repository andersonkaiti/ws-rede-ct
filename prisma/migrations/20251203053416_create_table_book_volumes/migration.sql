-- CreateTable
CREATE TABLE "book_volumes" (
    "id" TEXT NOT NULL,
    "volume_number" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "access_url" TEXT,
    "author_image_url" TEXT,
    "cover_image_url" TEXT,
    "catalog_sheet_url" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "book_volumes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "book_volume_id" ON "book_volumes"("id");
