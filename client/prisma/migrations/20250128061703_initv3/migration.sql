/*
  Warnings:

  - You are about to drop the column `category` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `stateId` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "category",
DROP COLUMN "state",
DROP COLUMN "type",
ADD COLUMN     "stateId" TEXT NOT NULL,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Type" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "State" (
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
