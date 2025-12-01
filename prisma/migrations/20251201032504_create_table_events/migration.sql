-- CreateEnum
CREATE TYPE "EventFormat" AS ENUM ('ONLINE', 'IN_PERSON');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PENDING', 'CANCELLED', 'FINISHED');

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "status" "EventStatus" NOT NULL DEFAULT 'PENDING',
    "format" "EventFormat" NOT NULL DEFAULT 'ONLINE',
    "event_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "event_id" ON "events"("id");
