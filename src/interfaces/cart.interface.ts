import { IProduct } from './product.interface'

export interface ICart {
	productId: number
	userId: number
	count?: number
}

export interface ICartStateProps extends IProduct {
	count: number
}

export interface ICartItemProps {
	cartProduct: ICartStateProps
}
export interface ICartState {
	cartProducts: ICartStateProps[]
}
