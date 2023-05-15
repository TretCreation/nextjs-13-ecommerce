-- RenameIndex
ALTER TABLE `Product` RENAME INDEX `Product_brandId_fkey` TO `Product_brandId_idx`;

-- RenameIndex
ALTER TABLE `Product` RENAME INDEX `Product_typeId_fkey` TO `Product_typeId_idx`;

-- RenameIndex
ALTER TABLE `Wishlist` RENAME INDEX `Wishlist_productId_fkey` TO `Wishlist_productId_idx`;

-- RenameIndex
ALTER TABLE `Wishlist` RENAME INDEX `Wishlist_userId_fkey` TO `Wishlist_userId_idx`;
