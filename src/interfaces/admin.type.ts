import { ICartPayment } from './cart.interface'

export interface IEmail {
  email: string
  status: string
  subtotal: number
  cartProducts: ICartPayment[]
}

export interface IViber {
  messages: {
    from: string
    to: string
    content: {
      text: string
    }
  }[]
}

export interface ISMS {
  messages: {
    destinations: {
      to: string
    }[]
    from: string
    text: string
  }[]
}
