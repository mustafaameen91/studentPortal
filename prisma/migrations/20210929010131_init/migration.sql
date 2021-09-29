-- CreateTable
CREATE TABLE `AdministrativeOrder` (
    `idAdministrative` INTEGER NOT NULL AUTO_INCREMENT,
    `orderTitleId` INTEGER NOT NULL,
    `orderNumber` INTEGER NOT NULL,
    `orderDescription` TEXT NOT NULL,
    `orderYear` VARCHAR(220) NOT NULL,
    `orderLevel` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `orderDate` DATETIME(3) NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idAdministrative`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderTitle` (
    `idOrderTitle` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(220) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NOT NULL,

    PRIMARY KEY (`idOrderTitle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExitCauses` (
    `idExitCauses` INTEGER NOT NULL AUTO_INCREMENT,
    `exitCausesTitle` VARCHAR(220) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NOT NULL,

    PRIMARY KEY (`idExitCauses`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PassType` (
    `idPassType` INTEGER NOT NULL AUTO_INCREMENT,
    `passName` VARCHAR(220) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NOT NULL,

    PRIMARY KEY (`idPassType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(220) NOT NULL,
    `password` VARCHAR(220) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `sectionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `idRole` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(220) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idRole`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Section` (
    `idSection` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionName` VARCHAR(220) NOT NULL,
    `code` VARCHAR(220) NOT NULL,
    `englishName` VARCHAR(220) NOT NULL,

    PRIMARY KEY (`idSection`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `idStudent` INTEGER NOT NULL AUTO_INCREMENT,
    `studentName` VARCHAR(220) NOT NULL,
    `englishName` VARCHAR(220) NOT NULL,
    `mail` VARCHAR(220) NOT NULL,
    `password` VARCHAR(220) NOT NULL,
    `dob` VARCHAR(220) NOT NULL,
    `sectionId` INTEGER NOT NULL,
    `nationality` VARCHAR(220) NOT NULL,
    `phone` VARCHAR(220) NOT NULL,
    `gender` BOOLEAN NOT NULL,
    `studyType` BOOLEAN NOT NULL,
    `relationships` BOOLEAN NOT NULL,
    `note` TEXT NOT NULL,
    `religion` VARCHAR(220) NOT NULL,
    `motherName` VARCHAR(220) NOT NULL,
    `collegeNumber` VARCHAR(220) NOT NULL,
    `registerYearId` INTEGER NOT NULL,
    `studentStatusId` INTEGER NOT NULL,
    `acceptedTypeId` INTEGER NOT NULL,

    UNIQUE INDEX `Student_mail_key`(`mail`),
    PRIMARY KEY (`idStudent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YearStudy` (
    `idYearStudy` INTEGER NOT NULL AUTO_INCREMENT,
    `year` VARCHAR(220) NOT NULL,
    `currentYear` BOOLEAN NOT NULL,

    PRIMARY KEY (`idYearStudy`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentResponsible` (
    `idStudentResponsible` INTEGER NOT NULL AUTO_INCREMENT,
    `responsibleName` VARCHAR(220) NOT NULL,
    `responsiblePhone` VARCHAR(220) NOT NULL,
    `studentId` INTEGER NOT NULL,

    PRIMARY KEY (`idStudentResponsible`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NationalityCertificate` (
    `idNationalityCertificate` INTEGER NOT NULL AUTO_INCREMENT,
    `nationalityNumber` VARCHAR(220) NOT NULL,
    `nationalityIssue` VARCHAR(220) NOT NULL,
    `nationalityPlace` VARCHAR(220) NOT NULL,
    `studentId` INTEGER NOT NULL,

    PRIMARY KEY (`idNationalityCertificate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NationalInfo` (
    `idNationalInfo` INTEGER NOT NULL AUTO_INCREMENT,
    `nationalNumber` VARCHAR(220) NOT NULL,
    `issueNumber` VARCHAR(220) NOT NULL,
    `issuePlace` VARCHAR(220) NOT NULL,
    `studentId` INTEGER NOT NULL,

    UNIQUE INDEX `NationalInfo_studentId_unique`(`studentId`),
    PRIMARY KEY (`idNationalInfo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentGraduation` (
    `idStudentGraduation` INTEGER NOT NULL AUTO_INCREMENT,
    `graduationDate` VARCHAR(220) NOT NULL,
    `studentId` INTEGER NOT NULL,

    UNIQUE INDEX `StudentGraduation_studentId_unique`(`studentId`),
    PRIMARY KEY (`idStudentGraduation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentLevel` (
    `idStudentLevel` INTEGER NOT NULL AUTO_INCREMENT,
    `level` INTEGER NOT NULL,
    `class` VARCHAR(220) NOT NULL,
    `yearStudyId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,

    PRIMARY KEY (`idStudentLevel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentSchool` (
    `idStudentSchool` INTEGER NOT NULL AUTO_INCREMENT,
    `schoolName` VARCHAR(220) NOT NULL,
    `graduationDate` VARCHAR(220) NOT NULL,
    `documentDate` VARCHAR(220) NOT NULL,
    `totalMarks` INTEGER NOT NULL,
    `average` DOUBLE NOT NULL,
    `documentNumber` INTEGER NOT NULL,
    `lessonCount` INTEGER NOT NULL,
    `Directorate` VARCHAR(220) NOT NULL,
    `studySubCategoryId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `certificateStatusId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `StudentSchool_studentId_unique`(`studentId`),
    PRIMARY KEY (`idStudentSchool`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudyCategory` (
    `idStudyCategory` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(220) NOT NULL,

    PRIMARY KEY (`idStudyCategory`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudySubCategory` (
    `idStudySubCategory` INTEGER NOT NULL AUTO_INCREMENT,
    `subCategoryName` VARCHAR(220) NOT NULL,
    `studyCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`idStudySubCategory`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CertificateStatus` (
    `idCertificateStatus` INTEGER NOT NULL AUTO_INCREMENT,
    `certificateStatusName` VARCHAR(220) NOT NULL,
    `certificateStatusDescription` VARCHAR(220) NOT NULL,

    PRIMARY KEY (`idCertificateStatus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentStatus` (
    `idStudentStatus` INTEGER NOT NULL AUTO_INCREMENT,
    `statusName` VARCHAR(220) NOT NULL,

    PRIMARY KEY (`idStudentStatus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcceptedType` (
    `idAcceptedType` INTEGER NOT NULL AUTO_INCREMENT,
    `acceptedName` VARCHAR(220) NOT NULL,

    PRIMARY KEY (`idAcceptedType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentImage` (
    `idStudentImage` INTEGER NOT NULL AUTO_INCREMENT,
    `imagePath` VARCHAR(220) NOT NULL,
    `studentId` INTEGER NOT NULL,

    PRIMARY KEY (`idStudentImage`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Province` (
    `idProvince` INTEGER NOT NULL AUTO_INCREMENT,
    `provinceName` VARCHAR(220) NOT NULL,
    `provinceNameEn` VARCHAR(220) NOT NULL,

    PRIMARY KEY (`idProvince`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `idAddress` INTEGER NOT NULL AUTO_INCREMENT,
    `provinceId` INTEGER NOT NULL,
    `district` VARCHAR(220) NOT NULL,
    `avenue` VARCHAR(220) NOT NULL,
    `houseNumber` VARCHAR(220) NOT NULL,
    `streetNumber` VARCHAR(220) NOT NULL,
    `studentId` INTEGER NOT NULL,

    UNIQUE INDEX `Address_studentId_unique`(`studentId`),
    PRIMARY KEY (`idAddress`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdministrativeOrder` ADD CONSTRAINT `AdministrativeOrder_orderTitleId_fkey` FOREIGN KEY (`orderTitleId`) REFERENCES `OrderTitle`(`idOrderTitle`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdministrativeOrder` ADD CONSTRAINT `AdministrativeOrder_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdministrativeOrder` ADD CONSTRAINT `AdministrativeOrder_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderTitle` ADD CONSTRAINT `OrderTitle_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExitCauses` ADD CONSTRAINT `ExitCauses_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PassType` ADD CONSTRAINT `PassType_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`idRole`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`idSection`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`idSection`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_registerYearId_fkey` FOREIGN KEY (`registerYearId`) REFERENCES `YearStudy`(`idYearStudy`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_studentStatusId_fkey` FOREIGN KEY (`studentStatusId`) REFERENCES `StudentStatus`(`idStudentStatus`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_acceptedTypeId_fkey` FOREIGN KEY (`acceptedTypeId`) REFERENCES `AcceptedType`(`idAcceptedType`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentResponsible` ADD CONSTRAINT `StudentResponsible_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NationalityCertificate` ADD CONSTRAINT `NationalityCertificate_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NationalInfo` ADD CONSTRAINT `NationalInfo_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentGraduation` ADD CONSTRAINT `StudentGraduation_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentLevel` ADD CONSTRAINT `StudentLevel_yearStudyId_fkey` FOREIGN KEY (`yearStudyId`) REFERENCES `YearStudy`(`idYearStudy`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentLevel` ADD CONSTRAINT `StudentLevel_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentSchool` ADD CONSTRAINT `StudentSchool_studySubCategoryId_fkey` FOREIGN KEY (`studySubCategoryId`) REFERENCES `StudySubCategory`(`idStudySubCategory`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentSchool` ADD CONSTRAINT `StudentSchool_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentSchool` ADD CONSTRAINT `StudentSchool_certificateStatusId_fkey` FOREIGN KEY (`certificateStatusId`) REFERENCES `CertificateStatus`(`idCertificateStatus`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudySubCategory` ADD CONSTRAINT `StudySubCategory_studyCategoryId_fkey` FOREIGN KEY (`studyCategoryId`) REFERENCES `StudyCategory`(`idStudyCategory`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentImage` ADD CONSTRAINT `StudentImage_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `Province`(`idProvince`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;
