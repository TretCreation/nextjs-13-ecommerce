/*
  Warnings:

  - Added the required column `test` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Product_name_key` ON `Product`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `test` VARCHAR(191) NOT NULL;
