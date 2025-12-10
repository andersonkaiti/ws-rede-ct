-- CreateTable
CREATE TABLE "research_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT,
    "description" TEXT,
    "url" TEXT,
    "logo_url" TEXT,
    "founded_at" TIMESTAMP(3) NOT NULL,
    "scope" TEXT,
    "email" TEXT,
    "leaderId" TEXT NOT NULL,
    "deputyLeaderId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "research_groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "research_group_id" ON "research_groups"("id");

-- AddForeignKey
ALTER TABLE "research_groups" ADD CONSTRAINT "research_groups_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_groups" ADD CONSTRAINT "research_groups_deputyLeaderId_fkey" FOREIGN KEY ("deputyLeaderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
