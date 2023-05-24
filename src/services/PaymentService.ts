import axios from 'axios'

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
			const res = await axios.post(`/payment/approve`, {
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
			const res = await axios.post(`/payment/add/order`, {
				orderId,
				productId,
				count
			})
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
