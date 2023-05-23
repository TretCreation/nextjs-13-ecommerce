import axios from 'axios'
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
	}
}
