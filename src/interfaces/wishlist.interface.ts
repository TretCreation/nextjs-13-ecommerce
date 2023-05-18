import { IProduct } from './product.interface'

export interface IWishlist {
	productId: number
	userId: number
}

export interface IWishlistProps {
	product: IProduct
}
