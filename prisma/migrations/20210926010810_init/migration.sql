/*
  Warnings:

  - You are about to drop the column `enterYear` on the `Student` table. All the data in the column will be lost.
  - Added the required column `registerYearId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Student` DROP COLUMN `enterYear`,
    ADD COLUMN `registerYearId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_registerYearId_fkey` FOREIGN KEY (`registerYearId`) REFERENCES `YearStudy`(`idYearStudy`) ON DELETE RESTRICT ON UPDATE CASCADE;
