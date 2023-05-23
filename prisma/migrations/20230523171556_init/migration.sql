-- DropIndex
DROP INDEX `Order_product_orderId_key` ON `Order_product`;

-- DropIndex
DROP INDEX `Order_product_productId_key` ON `Order_product`;

-- DropIndex
DROP INDEX `Product_info_productId_key` ON `Product_info`;

-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `count` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX `Order_product_orderId_idx` ON `Order_product`(`orderId`);

-- CreateIndex
CREATE INDEX `Order_product_productId_idx` ON `Order_product`(`productId`);

-- CreateIndex
CREATE INDEX `Product_info_productId_idx` ON `Product_info`(`productId`);
