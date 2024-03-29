import axios from 'axios'

import { IProduct } from '../interfaces/product.interface'
import { IWishlist } from '../interfaces/wishlist.interface'

axios.defaults.baseURL = process.env.API_URL

export const WishlistService = {
	async getAll() {
		try {
			const res = await axios.get<IWishlist[]>(`/wishlist`)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async getById(userId: number) {
		try {
			const res = await axios.post<IProduct[]>(`/wishlist`, {
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
			const res = await axios.post<IWishlist>(`/wishlist/add`, {
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
			const res = await axios.post<IWishlist>(`/wishlist/remove`, {
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
