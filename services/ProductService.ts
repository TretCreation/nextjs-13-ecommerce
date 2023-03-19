import axios from 'axios'

export const ProductService = {
	async getAll() {
		try {
			const res = await axios.get(`/api/getProducts`)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
