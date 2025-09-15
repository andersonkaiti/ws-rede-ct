-- CreateTable
CREATE TABLE "pendencies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "due_date" TIMESTAMP(3),
    "document_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "pendencies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pendencies" ADD CONSTRAINT "pendencies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
