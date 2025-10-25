-- CreateEnum
CREATE TYPE "InMemoriamRole" AS ENUM ('RESEARCHER', 'LEADER');

-- CreateTable
CREATE TABLE "in_memoriam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "death_date" TIMESTAMP(3) NOT NULL,
    "biography" TEXT,
    "photo_url" TEXT,
    "role" "InMemoriamRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "in_memoriam_pkey" PRIMARY KEY ("id")
);
