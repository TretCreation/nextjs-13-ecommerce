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

//* Fetch
// const controller = new AbortController()
// setTimeout(() => controller.abort(), 2000)

// export const ProductService = {
// 	async getAll() {
// 		try {
// 			const res = await fetch(`/api/getProducts`, {
// 				method: 'GET',
// 				signal: controller.signal
// 			})
// 			// console.log(res)
// 			if (!res.ok) {
// 				throw new Error(`Error! status: ${res.status}`)
// 			}
// 			const data = await res.json()

// 			return data
// 		} catch (err) {
// 			console.log(err)
// 		}
// 	}
// }
