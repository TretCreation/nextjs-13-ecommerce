import axios from 'axios'
import { ICartPayment } from '../interfaces/cart.interface'

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
	},
	async sendEmail(email: string, status: string, subtotal: number, cartProducts: ICartPayment[]) {
		try {
			const res = await axios.post(`/payment/send/email`, {
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
	async sendEmailTtn(email: string, ttn: string) {
		try {
			const res = await axios.post(`/payment/send/email/ttn`, {
				email,
				ttn
			})
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async sendViber(phone: number, transactionId: string) {
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
			const res = await axios.post(
				'https://k3g66n.api.infobip.com/viber/1/message/text',
				data,
				{ headers }
			)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async sendSMS(phone: number, transactionId: string) {
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
			const res = await axios.post(
				'https://k3g66n.api.infobip.com/sms/2/text/advanced',
				data,
				{ headers }
			)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async sendViberTtn(phone: number, ttn: string) {
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
						text: `Your TTN: ${ttn}.`
					}
				}
			]
		}

		try {
			const res = await axios.post(
				'https://k3g66n.api.infobip.com/viber/1/message/text',
				data,
				{ headers }
			)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async sendSMSTtn(phone: number, ttn: string) {
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
					text: `Your TTN: ${ttn}.`
				}
			]
		}
		try {
			const res = await axios.post(
				'https://k3g66n.api.infobip.com/sms/2/text/advanced',
				data,
				{ headers }
			)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
