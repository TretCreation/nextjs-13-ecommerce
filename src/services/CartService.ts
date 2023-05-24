import axios from 'axios'
import { ICart, ICartStateProps } from '../interfaces/cart.interface'

axios.defaults.baseURL = process.env.API_URL

export const CartService = {
	async getAll() {
		try {
			const res = await axios.get<ICart[]>(`/cart`)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async getById(userId: number) {
		try {
			const res = await axios.post<ICartStateProps[]>(`/cart`, {
				userId
			})
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async addProduct(productId: number, userId: number) {
		try {
			const res = await axios.post<ICart>(`/cart/add`, {
				productId,
				userId
			})
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async removeProduct(productId: number, userId: number) {
		try {
			const res = await axios.post<ICart>(`/cart/remove`, {
				productId,
				userId
			})
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async updateProductCount(productId: number, userId: number, count: number) {
		try {
			const res = await axios.post<ICart>(`/cart/update/count`, {
				productId,
				userId,
				count
			})
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async clearCart(userId: number) {
		try {
			const res = await axios.post<ICart>(`/cart/clear`, {
				userId
			})
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
