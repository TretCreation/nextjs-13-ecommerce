/*
  Warnings:

  - You are about to drop the column `ing` on the `Product` table. All the data in the column will be lost.
  - Added the required column `img` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `ing`,
    ADD COLUMN `img` VARCHAR(191) NOT NULL;
