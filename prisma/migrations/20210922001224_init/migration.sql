-- CreateTable
CREATE TABLE `StudentImage` (
    `idStudentImage` INTEGER NOT NULL AUTO_INCREMENT,
    `imagePath` VARCHAR(220) NOT NULL,
    `studentId` INTEGER NOT NULL,

    PRIMARY KEY (`idStudentImage`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentImage` ADD CONSTRAINT `StudentImage_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;
