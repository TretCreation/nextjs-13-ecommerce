import axios from 'axios'
import { IProduct } from '../interfaces/product.interface'

axios.defaults.baseURL = process.env.API_URL

export const CategoryService = {
	async getCategoryProduct(q: number) {
		try {
			const res = await axios.get<IProduct[]>(`/category?q=` + q)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
