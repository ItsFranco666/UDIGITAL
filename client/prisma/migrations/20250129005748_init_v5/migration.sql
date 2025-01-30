/*
  Warnings:

  - You are about to drop the column `state` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Reserve` table. All the data in the column will be lost.
  - Added the required column `stateName` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateName` to the `Reserve` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "state",
ADD COLUMN     "stateName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reserve" DROP COLUMN "state",
ADD COLUMN     "stateName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_stateName_fkey" FOREIGN KEY ("stateName") REFERENCES "State"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_stateName_fkey" FOREIGN KEY ("stateName") REFERENCES "State"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
