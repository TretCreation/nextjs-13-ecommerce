import axios from 'axios'
import { sortKey, sortValue, typeId } from '../interfaces/api.type'
import { IProduct } from '../interfaces/product.interface'

axios.defaults.baseURL = process.env.API_URL

export const SortByService = {
	async getSortedProducts(k: sortKey, v: sortValue, q: typeId) {
		try {
			const res = await axios.get<IProduct[]>(`/sort?q=${q}&${k}=` + v)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}