import axios from 'axios'

import { IType } from '../interfaces/type.interface'

axios.defaults.baseURL = process.env.API_URL

export const TypeService = {
	async getAllTypes() {
		try {
			const res = await axios.get<IType[]>(`/products/type`)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
