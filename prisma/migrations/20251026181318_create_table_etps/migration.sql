-- CreateTable
CREATE TABLE "etp_leader" (
    "id" TEXT NOT NULL,
    "etp_id" TEXT NOT NULL,
    "researcher_id" TEXT NOT NULL,

    CONSTRAINT "etp_leader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etp_deputy" (
    "id" TEXT NOT NULL,
    "etp_id" TEXT NOT NULL,
    "researcher_id" TEXT NOT NULL,

    CONSTRAINT "etp_deputy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etp_secretary" (
    "id" TEXT NOT NULL,
    "etp_id" TEXT NOT NULL,
    "researcher_id" TEXT NOT NULL,

    CONSTRAINT "etp_secretary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etps" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "etps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_etp_members" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_etp_members_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "etp_leader_etp_id_key" ON "etp_leader"("etp_id");

-- CreateIndex
CREATE UNIQUE INDEX "etp_deputy_etp_id_key" ON "etp_deputy"("etp_id");

-- CreateIndex
CREATE UNIQUE INDEX "etp_secretary_etp_id_key" ON "etp_secretary"("etp_id");

-- CreateIndex
CREATE UNIQUE INDEX "etps_code_key" ON "etps"("code");

-- CreateIndex
CREATE INDEX "etps_code_idx" ON "etps"("code");

-- CreateIndex
CREATE INDEX "_etp_members_B_index" ON "_etp_members"("B");

-- AddForeignKey
ALTER TABLE "etp_leader" ADD CONSTRAINT "etp_leader_etp_id_fkey" FOREIGN KEY ("etp_id") REFERENCES "etps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etp_leader" ADD CONSTRAINT "etp_leader_researcher_id_fkey" FOREIGN KEY ("researcher_id") REFERENCES "researchers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etp_deputy" ADD CONSTRAINT "etp_deputy_etp_id_fkey" FOREIGN KEY ("etp_id") REFERENCES "etps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etp_deputy" ADD CONSTRAINT "etp_deputy_researcher_id_fkey" FOREIGN KEY ("researcher_id") REFERENCES "researchers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etp_secretary" ADD CONSTRAINT "etp_secretary_etp_id_fkey" FOREIGN KEY ("etp_id") REFERENCES "etps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etp_secretary" ADD CONSTRAINT "etp_secretary_researcher_id_fkey" FOREIGN KEY ("researcher_id") REFERENCES "researchers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_etp_members" ADD CONSTRAINT "_etp_members_A_fkey" FOREIGN KEY ("A") REFERENCES "etps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_etp_members" ADD CONSTRAINT "_etp_members_B_fkey" FOREIGN KEY ("B") REFERENCES "researchers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
