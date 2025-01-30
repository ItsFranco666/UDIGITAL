/*
  Warnings:

  - Added the required column `locationName` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "locationName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_locationName_fkey" FOREIGN KEY ("locationName") REFERENCES "Location"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
