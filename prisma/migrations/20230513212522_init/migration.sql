-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Order_product` DROP FOREIGN KEY `Order_product_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `Order_product` DROP FOREIGN KEY `Order_product_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_typeId_fkey`;

-- DropForeignKey
ALTER TABLE `Product_info` DROP FOREIGN KEY `Product_info_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Wishlist` DROP FOREIGN KEY `Wishlist_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Wishlist` DROP FOREIGN KEY `Wishlist_userId_fkey`;
