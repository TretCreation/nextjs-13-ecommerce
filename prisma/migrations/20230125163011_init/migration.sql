-- AddForeignKey
ALTER TABLE `Order_product` ADD CONSTRAINT `Order_product_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
