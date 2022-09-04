/*
  Warnings:

  - You are about to alter the column `orderYear` on the `administrativeorder` table. The data in that column could be lost. The data in that column will be cast from `VarChar(220)` to `Int`.
  - You are about to drop the column `issueNumber` on the `nationalinfo` table. All the data in the column will be lost.
  - You are about to drop the column `issuePlace` on the `nationalinfo` table. All the data in the column will be lost.
  - You are about to drop the column `nationalityIssue` on the `nationalitycertificate` table. All the data in the column will be lost.
  - You are about to drop the column `nationalityPlace` on the `nationalitycertificate` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `relationships` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `student` table. All the data in the column will be lost.
  - You are about to alter the column `graduationDate` on the `studentgraduation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(220)` to `Int`.
  - You are about to drop the column `Directorate` on the `studentschool` table. All the data in the column will be lost.
  - You are about to alter the column `graduationDate` on the `studentschool` table. The data in that column could be lost. The data in that column will be cast from `VarChar(220)` to `Int`.
  - A unique constraint covering the columns `[collegeNumber]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `ExitCauses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherName` to the `NationalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `religion` to the `NationalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `directorate` to the `StudentSchool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examNumber` to the `StudentSchool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passTypeId` to the `StudentSchool` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Student_mail_key` ON `student`;

-- AlterTable
ALTER TABLE `administrativeorder` MODIFY `orderNumber` VARCHAR(220) NOT NULL,
    MODIFY `orderYear` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `exitcauses` ADD COLUMN `studentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `nationalinfo` DROP COLUMN `issueNumber`,
    DROP COLUMN `issuePlace`,
    ADD COLUMN `motherName` VARCHAR(220) NOT NULL,
    ADD COLUMN `religion` VARCHAR(220) NOT NULL;

-- AlterTable
ALTER TABLE `nationalitycertificate` DROP COLUMN `nationalityIssue`,
    DROP COLUMN `nationalityPlace`;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `motherName`,
    DROP COLUMN `password`,
    DROP COLUMN `phone`,
    DROP COLUMN `relationships`,
    DROP COLUMN `religion`,
    MODIFY `englishName` VARCHAR(220) NOT NULL DEFAULT 'englishName',
    MODIFY `mail` VARCHAR(220) NOT NULL DEFAULT 'student@duc.edu.iq';

-- AlterTable
ALTER TABLE `studentgraduation` MODIFY `graduationDate` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `studentimage` ADD COLUMN `imageTypeId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `studentschool` DROP COLUMN `Directorate`,
    ADD COLUMN `correctDate` VARCHAR(220) NOT NULL DEFAULT '1960-01-01',
    ADD COLUMN `correctDateAnswer` VARCHAR(220) NOT NULL DEFAULT '1960-01-01',
    ADD COLUMN `correctNumber` VARCHAR(220) NOT NULL DEFAULT '0',
    ADD COLUMN `correctNumberAnswer` VARCHAR(220) NOT NULL DEFAULT '0',
    ADD COLUMN `directorate` VARCHAR(220) NOT NULL,
    ADD COLUMN `documentDigit` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `examNumber` VARCHAR(220) NOT NULL,
    ADD COLUMN `passTypeId` INTEGER NOT NULL,
    MODIFY `graduationDate` INTEGER NOT NULL DEFAULT 1,
    MODIFY `documentDate` VARCHAR(220) NOT NULL DEFAULT '1960-01-01',
    MODIFY `documentNumber` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `ImageType` (
    `idImageType` INTEGER NOT NULL AUTO_INCREMENT,
    `typeName` VARCHAR(220) NOT NULL,

    PRIMARY KEY (`idImageType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Archive` (
    `idArchive` INTEGER NOT NULL AUTO_INCREMENT,
    `from` VARCHAR(220) NOT NULL,
    `to` VARCHAR(220) NOT NULL,
    `archiveDate` DATETIME(3) NOT NULL,
    `archiveSubjectId` INTEGER NOT NULL,
    `incomeNumber` VARCHAR(220) NOT NULL DEFAULT '1',
    `incomeDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `archiveNumber` VARCHAR(220) NOT NULL,
    `subjectDescription` VARCHAR(220) NOT NULL,
    `note` VARCHAR(220) NOT NULL,
    `sectionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `archiveTypeId` INTEGER NOT NULL DEFAULT 1,
    `yearStudyId` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`idArchive`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArchiveSubject` (
    `idArchiveSubject` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectName` VARCHAR(220) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idArchiveSubject`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArchiveType` (
    `idArchiveType` INTEGER NOT NULL AUTO_INCREMENT,
    `typeName` VARCHAR(220) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idArchiveType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArchiveImage` (
    `idArchiveImage` INTEGER NOT NULL AUTO_INCREMENT,
    `imagePath` VARCHAR(220) NOT NULL,
    `archiveId` INTEGER NOT NULL,

    PRIMARY KEY (`idArchiveImage`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SectionCost` (
    `idSectionCost` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionId` INTEGER NULL DEFAULT 1,
    `cost` DOUBLE NOT NULL,
    `attempts` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,

    PRIMARY KEY (`idSectionCost`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentPayment` (
    `idStudentPayment` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `discountId` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,

    PRIMARY KEY (`idStudentPayment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentFees` (
    `idStudentFees` INTEGER NOT NULL AUTO_INCREMENT,
    `feesPay` DOUBLE NOT NULL,
    `payTypeId` INTEGER NOT NULL,
    `payNote` TEXT NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `studentPaymentId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `checkNumber` VARCHAR(220) NOT NULL,

    PRIMARY KEY (`idStudentFees`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PayType` (
    `idPayType` INTEGER NOT NULL AUTO_INCREMENT,
    `typeName` VARCHAR(220) NOT NULL,

    PRIMARY KEY (`idPayType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcceptedTypeDiscount` (
    `idAcceptedTypeDiscount` INTEGER NOT NULL AUTO_INCREMENT,
    `acceptedType` VARCHAR(220) NOT NULL,
    `discount` INTEGER NOT NULL,

    PRIMARY KEY (`idAcceptedTypeDiscount`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Student_collegeNumber_key` ON `Student`(`collegeNumber`);

-- AddForeignKey
ALTER TABLE `AdministrativeOrder` ADD CONSTRAINT `AdministrativeOrder_orderYear_fkey` FOREIGN KEY (`orderYear`) REFERENCES `YearStudy`(`idYearStudy`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExitCauses` ADD CONSTRAINT `ExitCauses_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentGraduation` ADD CONSTRAINT `StudentGraduation_graduationDate_fkey` FOREIGN KEY (`graduationDate`) REFERENCES `YearStudy`(`idYearStudy`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentSchool` ADD CONSTRAINT `StudentSchool_graduationDate_fkey` FOREIGN KEY (`graduationDate`) REFERENCES `YearStudy`(`idYearStudy`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentSchool` ADD CONSTRAINT `StudentSchool_passTypeId_fkey` FOREIGN KEY (`passTypeId`) REFERENCES `PassType`(`idPassType`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentImage` ADD CONSTRAINT `StudentImage_imageTypeId_fkey` FOREIGN KEY (`imageTypeId`) REFERENCES `ImageType`(`idImageType`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Archive` ADD CONSTRAINT `Archive_archiveSubjectId_fkey` FOREIGN KEY (`archiveSubjectId`) REFERENCES `ArchiveSubject`(`idArchiveSubject`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Archive` ADD CONSTRAINT `Archive_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`idSection`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Archive` ADD CONSTRAINT `Archive_archiveTypeId_fkey` FOREIGN KEY (`archiveTypeId`) REFERENCES `ArchiveType`(`idArchiveType`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Archive` ADD CONSTRAINT `Archive_yearStudyId_fkey` FOREIGN KEY (`yearStudyId`) REFERENCES `YearStudy`(`idYearStudy`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArchiveImage` ADD CONSTRAINT `ArchiveImage_archiveId_fkey` FOREIGN KEY (`archiveId`) REFERENCES `Archive`(`idArchive`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SectionCost` ADD CONSTRAINT `SectionCost_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`idSection`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentPayment` ADD CONSTRAINT `StudentPayment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentPayment` ADD CONSTRAINT `StudentPayment_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `AcceptedTypeDiscount`(`idAcceptedTypeDiscount`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentFees` ADD CONSTRAINT `StudentFees_payTypeId_fkey` FOREIGN KEY (`payTypeId`) REFERENCES `PayType`(`idPayType`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentFees` ADD CONSTRAINT `StudentFees_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentFees` ADD CONSTRAINT `StudentFees_studentPaymentId_fkey` FOREIGN KEY (`studentPaymentId`) REFERENCES `StudentPayment`(`idStudentPayment`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `Address_studentId_key` ON `Address`(`studentId`);
DROP INDEX `Address_studentId_unique` ON `address`;

-- RedefineIndex
CREATE UNIQUE INDEX `NationalInfo_studentId_key` ON `NationalInfo`(`studentId`);
DROP INDEX `NationalInfo_studentId_unique` ON `nationalinfo`;

-- RedefineIndex
CREATE UNIQUE INDEX `StudentGraduation_studentId_key` ON `StudentGraduation`(`studentId`);
DROP INDEX `StudentGraduation_studentId_unique` ON `studentgraduation`;

-- RedefineIndex
CREATE UNIQUE INDEX `StudentSchool_studentId_key` ON `StudentSchool`(`studentId`);
DROP INDEX `StudentSchool_studentId_unique` ON `studentschool`;
