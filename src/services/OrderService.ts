import axios from 'axios'

import { IOrderHistory } from '../interfaces/order.interface'

axios.defaults.baseURL = process.env.API_URL

export const OrderService = {
	async getSearchedProducts(userId: number | undefined) {
		try {
			const res = await axios.get<IOrderHistory[]>(`/order/history?userId=` + userId)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
