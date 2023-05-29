/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Brand_name_key` ON `Brand`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Type_name_key` ON `Type`(`name`);
