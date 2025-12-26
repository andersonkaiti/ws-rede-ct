-- CreateTable
CREATE TABLE "financial_transaction_statements" (
    "id" TEXT NOT NULL,
    "document_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financial_transaction_statements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "financial_transaction_statement_id" ON "financial_transaction_statements"("id");
