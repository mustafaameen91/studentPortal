/*
  Warnings:

  - You are about to drop the `PassType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PassType` DROP FOREIGN KEY `PassType_createdBy_fkey`;

-- DropTable
DROP TABLE `PassType`;
