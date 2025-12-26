-- CreateEnum
CREATE TYPE "CheckingAccountType" AS ENUM ('EXCLUSIVE_REDECT_USE', 'EVENTS', 'COLLOQUIUM');

-- CreateTable
CREATE TABLE "checking_accounts" (
    "id" TEXT NOT NULL,
    "type" "CheckingAccountType" NOT NULL,
    "balance_in_cents" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checking_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "checking_account_id" ON "checking_accounts"("id");
