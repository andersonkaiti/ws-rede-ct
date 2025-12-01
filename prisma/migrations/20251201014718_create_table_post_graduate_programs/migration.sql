-- CreateTable
CREATE TABLE "post_graduate_programs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "contact" TEXT NOT NULL,
    "registration_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_graduate_programs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "post_graduate_program_id" ON "post_graduate_programs"("id");
