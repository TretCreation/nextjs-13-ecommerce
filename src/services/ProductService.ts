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
			const res = await axios.get<IProduct>(`/products/${id}`)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
