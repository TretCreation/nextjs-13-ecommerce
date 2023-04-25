import axios from 'axios'
import { IProduct } from '../interfaces/product.interface'

axios.defaults.baseURL = process.env.API_URL

export const SearchService = {
	async getSortedProductsByPrice(p: string) {
		try {
			const res = await axios.get<IProduct[]>(`/search?p=` + p)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},

	async getSortedProductsByName(n: string) {
		try {
			const res = await axios.get<IProduct[]>(`/search?n=` + n)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
