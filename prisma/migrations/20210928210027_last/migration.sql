-- CreateTable
CREATE TABLE `PassType` (
    `idPassType` INTEGER NOT NULL AUTO_INCREMENT,
    `passName` VARCHAR(220) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NOT NULL,

    PRIMARY KEY (`idPassType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PassType` ADD CONSTRAINT `PassType_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;
