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
			const res = await axios.get<IProduct>(`/product/${id}`)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},

	async getPaginatedProducts(limit: number, page: number) {
		try {
			const res = await axios.get<IProduct[]>(
				`/products/page?limit=${limit}&page=${page}`
			)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},

	async getCountedProducts() {
		try {
			const res = await axios.get<IProduct>(`/products/count`)
			return res.data.id
		} catch (error) {
			console.log(error)
			throw error
		}
	},

	async createProduct(formData: FormData) {
		try {
			// const data = Object.fromEntries(formData)
			// console.log(data)

			// name: data.name,
			// 		price: data.price,
			// 		img: data.img,
			// 		brandId: data.brandId,
			// 		typeId: data.typeId

			console.log('1')
			const res = await axios.post<IProduct>(`/admin/product/create`, {
				formData
			})
			console.log(res.data)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},

	async uploadImage(formData: FormData) {
		try {
			// const data = Object.fromEntries(formData)
			// console.log(data)

			console.log('1')
			const res = await axios.post<IProduct>(`/admin/product/upload`, {
				formData
			})
			console.log(res.data)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},

	async removeProduct(id: number) {
		try {
			const res = await axios.post<IProduct>(`/admin/product/remove`, { id })
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
