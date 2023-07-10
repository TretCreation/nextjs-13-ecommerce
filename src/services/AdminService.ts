import axios from 'axios'

import { IBrand } from '../interfaces/brand.interface'
import { IType } from '../interfaces/type.interface'

axios.defaults.baseURL = process.env.API_URL

export const AdminService = {
	async checkBrand(brand: string) {
		try {
			const res = await axios.get<IBrand[]>(`/admin/brand/check?brand=` + brand)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async addBrand(brand: string) {
		try {
			const res = await axios.post<IBrand[]>(`/admin/brand/add`, {
				brand: brand
			})
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async removeBrand(brand: string) {
		try {
			const res = await axios.post<IBrand[]>(`/admin/brand/remove`, {
				brand: brand
			})
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async checkType(type: string) {
		try {
			const res = await axios.get<IType[]>(`/admin/type/check?type=` + type)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async addType(type: string) {
		try {
			const res = await axios.post<IType[]>(`/admin/type/add`, {
				type: type
			})
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async removeType(type: string) {
		try {
			const res = await axios.post<IType[]>(`/admin/type/remove`, {
				type: type
			})
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
