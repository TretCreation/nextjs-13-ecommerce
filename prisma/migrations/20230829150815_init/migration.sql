/*
  Warnings:

  - You are about to drop the column `emailFacebook` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailGoogle` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_emailFacebook_key` ON `User`;

-- DropIndex
DROP INDEX `User_emailGoogle_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `emailFacebook`,
    DROP COLUMN `emailGoogle`;
