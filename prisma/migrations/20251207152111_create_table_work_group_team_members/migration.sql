-- CreateTable
CREATE TABLE "work_group_team_members" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "work_group_team_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "work_group_team_member_id" ON "work_group_team_members"("id");

-- AddForeignKey
ALTER TABLE "work_group_team_members" ADD CONSTRAINT "work_group_team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
