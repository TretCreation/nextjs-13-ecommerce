import axios from 'axios'
import { IProduct } from '../interfaces/product.interface'

axios.defaults.baseURL = process.env.API_URL

export const ProductService = {
	async getAll() {
		try {
			const res = await axios.get<IProduct[]>('/products')
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},

	async getById(id?: string) {
		try {
			const res = await axios.get<IProduct>(`/product/${id}`)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},

	async getPaginatedProducts(limit: number, page: number) {
		try {
			const res = await axios.get<IProduct[]>(
				`/products/page?limit=${limit}&page=${page}`
			)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},

	async getCountedProducts() {
		try {
			const res = await axios.get<IProduct>(`/products/count`)
			return res.data.id
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
