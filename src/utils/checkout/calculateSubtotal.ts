import { ICartStateProps } from '@/src/interfaces/cart.interface'

export const calculateSubtotal = (products: ICartStateProps[]): number => {
  let subtotal = 0

  products.forEach(product => {
    subtotal += product.price * product.count
  })

  return subtotal
}
