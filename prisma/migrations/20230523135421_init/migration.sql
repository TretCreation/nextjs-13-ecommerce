-- CreateTable
CREATE TABLE `Order_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `count` INTEGER NOT NULL,

    UNIQUE INDEX `Order_product_orderId_key`(`orderId`),
    UNIQUE INDEX `Order_product_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
