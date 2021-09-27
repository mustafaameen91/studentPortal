/*
  Warnings:

  - You are about to drop the column `year` on the `StudentLevel` table. All the data in the column will be lost.
  - Added the required column `yearStudyId` to the `StudentLevel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StudentLevel` DROP COLUMN `year`,
    ADD COLUMN `yearStudyId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `YearStudy` (
    `idYearStudy` INTEGER NOT NULL AUTO_INCREMENT,
    `year` VARCHAR(220) NOT NULL,
    `currentYear` BOOLEAN NOT NULL,

    PRIMARY KEY (`idYearStudy`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentLevel` ADD CONSTRAINT `StudentLevel_yearStudyId_fkey` FOREIGN KEY (`yearStudyId`) REFERENCES `YearStudy`(`idYearStudy`) ON DELETE RESTRICT ON UPDATE CASCADE;
