import axios from 'axios'

import { IBrand } from '../interfaces/brand.interface'

axios.defaults.baseURL = process.env.API_URL

export const BrandService = {
	async getAllBrands() {
		try {
			const res = await axios.get<IBrand[]>(`/products/brand`)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
