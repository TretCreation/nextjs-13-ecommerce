import axios from 'axios'

export const ProductService = {
	async getAllProducts() {
		const res = await axios.get(`/api/getProducts`)
		return res.data
	}
}