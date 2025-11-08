-- CreateEnum
CREATE TYPE "RegimentStatus" AS ENUM ('DRAFT', 'IN_FORCE', 'REVOKED');

-- CreateEnum
CREATE TYPE "MeetingFormat" AS ENUM ('ONLINE', 'IN_PERSON');

-- CreateEnum
CREATE TYPE "MeetingStatus" AS ENUM ('PENDING', 'CANCELLED', 'FINISHED');

-- CreateTable
CREATE TABLE "regiments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "document_url" TEXT NOT NULL,
    "status" "RegimentStatus" NOT NULL DEFAULT 'IN_FORCE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regiments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meetings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "format" "MeetingFormat" NOT NULL DEFAULT 'ONLINE',
    "agenda" TEXT NOT NULL,
    "meeting_link" TEXT,
    "location" TEXT,
    "status" "MeetingStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meeting_minutes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "document_url" TEXT NOT NULL,
    "meeting_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meeting_minutes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "meeting_minutes_meeting_id_key" ON "meeting_minutes"("meeting_id");

-- AddForeignKey
ALTER TABLE "meeting_minutes" ADD CONSTRAINT "meeting_minutes_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "meetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
