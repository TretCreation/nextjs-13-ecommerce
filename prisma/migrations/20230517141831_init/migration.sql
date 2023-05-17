/*
  Warnings:

  - Made the column `img` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `img` VARCHAR(191) NOT NULL DEFAULT '/icons.png';
