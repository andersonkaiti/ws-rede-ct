-- CreateTable
CREATE TABLE "museums" (
    "id" TEXT NOT NULL,
    "logo_url" TEXT,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "description" TEXT,
    "website" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "functioning" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "museums_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "museum_id" ON "museums"("id");
