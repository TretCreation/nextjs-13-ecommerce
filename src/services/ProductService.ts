import { IProduct } from '../interfaces/product.interface'
import axios from 'axios'

const API_URL = `/api/getProducts`

export const ProductService = {
	async getAll() {
		try {
			const res = await axios.get<IProduct[]>(API_URL)

			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async getById(id: string) {
		try {
			const res = await axios.get<IProduct[]>(API_URL, {
				params: {
					id
				}
			})
			console.log(res)

			return res.data[0]
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
