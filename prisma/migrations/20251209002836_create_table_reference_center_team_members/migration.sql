-- CreateTable
CREATE TABLE "reference_center_team_members" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "reference_center_team_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "reference_center_team_member_id" ON "reference_center_team_members"("id");

-- AddForeignKey
ALTER TABLE "reference_center_team_members" ADD CONSTRAINT "reference_center_team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
