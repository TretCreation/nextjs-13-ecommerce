import axios from 'axios'
import { IProduct } from '../interfaces/product.interface'

axios.defaults.baseURL = process.env.API_URL

export const SearchService = {
	async getSearchedProducts(q: string) {
		try {
			const res = await axios.get<IProduct[]>(`/search?q=` + q)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
