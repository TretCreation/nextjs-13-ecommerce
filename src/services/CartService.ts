import axios from 'axios'
import { ICart } from '../interfaces/cart.interface'
import { IProduct } from '../interfaces/product.interface'

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
			const res = await axios.post<IProduct[]>(`/cart`, {
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
	}
}
