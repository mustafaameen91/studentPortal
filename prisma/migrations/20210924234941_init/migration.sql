/*
  Warnings:

  - You are about to drop the column `addressId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `schoolNumber` on the `StudentSchool` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_addressId_fkey`;

-- AlterTable
ALTER TABLE `Address` ADD COLUMN `studentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Student` DROP COLUMN `addressId`;

-- AlterTable
ALTER TABLE `StudentSchool` DROP COLUMN `schoolNumber`;

-- CreateIndex
CREATE UNIQUE INDEX `Address_studentId_unique` ON `Address`(`studentId`);

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`idStudent`) ON DELETE RESTRICT ON UPDATE CASCADE;
