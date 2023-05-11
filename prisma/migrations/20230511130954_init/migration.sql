/*
  Warnings:

  - A unique constraint covering the columns `[emailGoogle]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailFacebook]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `emailFacebook` VARCHAR(191) NULL,
    ADD COLUMN `emailGoogle` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_emailGoogle_key` ON `User`(`emailGoogle`);

-- CreateIndex
CREATE UNIQUE INDEX `User_emailFacebook_key` ON `User`(`emailFacebook`);
