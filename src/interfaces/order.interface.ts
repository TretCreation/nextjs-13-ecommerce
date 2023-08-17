import { IProduct } from './product.interface'

export interface IOrderHistory extends IOrder {
  order_products: {
    count: number
    product: IProduct
  }[]
}

export interface IOrder {
  id: number
  userId: number
  status: string
  transactionId: string
  paymentAmount: string
  createdAt: string
  updatedAt: string
}

export interface IOrderProduct {
  orderId: number
  productId: number
  count: number
}
