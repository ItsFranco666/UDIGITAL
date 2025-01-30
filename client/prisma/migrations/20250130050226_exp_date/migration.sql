/*
  Warnings:

  - Added the required column `expirationDate` to the `Reserve` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserve" ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL;
