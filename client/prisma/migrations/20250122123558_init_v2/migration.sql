/*
  Warnings:

  - You are about to drop the column `estado` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Space` table. All the data in the column will be lost.
  - Added the required column `name` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "estado",
DROP COLUMN "nombre",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
