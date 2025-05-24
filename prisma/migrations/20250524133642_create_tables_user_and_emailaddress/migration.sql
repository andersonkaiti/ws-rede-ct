-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "birthday" TIMESTAMP(3),
    "imageUrl" TEXT,
    "profileImageUrl" TEXT,
    "lastSignInAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT,
    "privateMetadata" JSONB,
    "publicMetadata" JSONB,
    "unsafeMetadata" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailAddress" (
    "id" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "verification" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "linkedTo" JSONB,

    CONSTRAINT "EmailAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailAddress_emailAddress_key" ON "EmailAddress"("emailAddress");

-- AddForeignKey
ALTER TABLE "EmailAddress" ADD CONSTRAINT "EmailAddress_userId_fkey_2" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
