/*
  Warnings:

  - You are about to drop the column `certificateStatusDescription` on the `CertificateStatus` table. All the data in the column will be lost.
  - Added the required column `certificateStatusDescription` to the `StudentSchool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CertificateStatus` DROP COLUMN `certificateStatusDescription`;

-- AlterTable
ALTER TABLE `StudentSchool` ADD COLUMN `certificateStatusDescription` VARCHAR(220) NOT NULL;
