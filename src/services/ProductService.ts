import axios from 'axios'
import { IProduct, IProductPage } from '../interfaces/product.interface'

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
			const res = await axios.get<IProduct[]>(`/products/page?limit=${limit}&page=${page}`)
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
	async removeProduct(id: number) {
		try {
			const res = await axios.post<IProduct>(`/admin/product/remove`, { id })
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async addProductInfo(productId: number, description: string, title: string) {
		try {
			const res = await axios.post(`/product/info/add`, { productId, description, title })
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async removeProductInfo(productId: number) {
		try {
			const res = await axios.post<IProduct>(`/product/info/remove`, { productId })
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async getRecommendation(productId: number) {
		try {
			const res = await axios.get<IProductPage[] | undefined>(
				`/recommendations?productId=${productId}`
			)
			return res.data
		} catch (error) {
			console.log(error)
		}
	}
}
