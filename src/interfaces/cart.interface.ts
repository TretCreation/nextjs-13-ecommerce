import { IProduct } from './product.interface'

export interface ICart {
  productId: number
  userId: number
  count?: number
}

export interface ICartStateProps extends IProduct {
  count: number
}

export interface ICartStatePropsExist extends IProduct {
  count?: number
}

export interface ICartItem {
  cartProduct: ICartStateProps
  handleClose: () => void
}
export interface ICartState {
  cartProducts: ICartStateProps[]
}

export interface ICartPayment {
  id: number
  name: string
  price: number
  count: number
}
