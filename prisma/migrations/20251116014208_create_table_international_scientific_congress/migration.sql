-- CreateTable
CREATE TABLE "congresses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "edition" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "congress_link" TEXT,
    "general_notice_url" TEXT,
    "schedule_document_url" TEXT,
    "program_document_url" TEXT,
    "admin_report_document_url" TEXT,
    "proceedings_document_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "congresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "congress_partners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT,
    "congress_id" TEXT NOT NULL,

    CONSTRAINT "congress_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "congress_galleries" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "caption" TEXT,
    "congress_id" TEXT NOT NULL,

    CONSTRAINT "congress_galleries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "congress_edition" ON "congresses"("edition");

-- CreateIndex
CREATE INDEX "congress_partners_congress_id_idx" ON "congress_partners"("congress_id");

-- CreateIndex
CREATE INDEX "congress_galleries_congress_id_idx" ON "congress_galleries"("congress_id");

-- AddForeignKey
ALTER TABLE "congress_partners" ADD CONSTRAINT "congress_partners_congress_id_fkey" FOREIGN KEY ("congress_id") REFERENCES "congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "congress_galleries" ADD CONSTRAINT "congress_galleries_congress_id_fkey" FOREIGN KEY ("congress_id") REFERENCES "congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
