export interface IPayment {
  id: number
  userId: number
  status: string
  transactionId: string
  paymentAmount: number
  createdAt: string
  updatedAt: string
}
