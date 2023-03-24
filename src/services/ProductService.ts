import { IProduct } from '../interfaces/product.interface'
import axios from 'axios'

const API_URL = `http://localhost:3000/api`
axios.defaults.baseURL = API_URL

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
