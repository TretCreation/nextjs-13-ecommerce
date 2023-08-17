import axios from 'axios'

import { IEmail, ISMS, IViber } from '../interfaces/admin.type'
import { ICartPayment } from '../interfaces/cart.interface'
import { IOrderProduct } from '../interfaces/order.interface'
import { IPayment } from '../interfaces/payment.interface'

axios.defaults.baseURL = process.env.API_URL

export const PaymentService = {
  async approvePayment(
    userId: number,
    status: string,
    transactionId: string,
    paymentAmount: number,
    createdAt: string,
    updatedAt: string
  ) {
    try {
      const res = await axios.post<IPayment>(`/payment/approve`, {
        userId,
        status,
        transactionId,
        paymentAmount,
        createdAt,
        updatedAt
      })
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  async addOrderProduct(orderId: number, productId: number, count: number) {
    try {
      const res = await axios.post<IOrderProduct>(`/payment/add/order`, {
        orderId,
        productId,
        count
      })
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  async sendEmail(email: string, status: string, subtotal: number, cartProducts: ICartPayment[]) {
    try {
      const res = await axios.post<IEmail>(`/payment/send/email`, {
        email,
        status,
        subtotal,
        cartProducts
      })
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  async sendViber(phone: number, transactionId: string) {
    // ?
    const date = new Date()
    const formattedDate = date.toLocaleDateString('fr-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    const headers = {
      Authorization: process.env.AUTHORIZATION_VIBER,
      'Content-Type': 'application/json'
    }
    const data = {
      messages: [
        {
          from: 'DemoCompany',
          to: `${phone}`,
          content: {
            text: `Thank you for your purchase. Your Order №${transactionId}. Date of the order ${formattedDate}.`
          }
        }
      ]
    }
    try {
      const res = await axios.post<IViber>(
        'https://k3g66n.api.infobip.com/viber/1/message/text',
        data,
        {
          headers
        }
      )
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  async sendSMS(phone: number, transactionId: string) {
    // ?
    const date = new Date()
    const formattedDate = date.toLocaleDateString('fr-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    const headers = {
      Authorization: process.env.AUTHORIZATION_SMS,
      'Content-Type': 'application/json'
    }
    const data = {
      messages: [
        {
          destinations: [
            {
              to: `${phone}`
            }
          ],
          from: 'InfoSMS',
          text: `Thank you for your purchase. Your Order №${transactionId}. Date of the order ${formattedDate}.`
        }
      ]
    }
    try {
      const res = await axios.post<ISMS>(
        'https://k3g66n.api.infobip.com/sms/2/text/advanced',
        data,
        {
          headers
        }
      )
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
