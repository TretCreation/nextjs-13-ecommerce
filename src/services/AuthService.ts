import axios from 'axios'
import { IUser } from '../interfaces/user.interface'

axios.defaults.baseURL = process.env.API_URL

export const CategoryService = {
	async authorize() {
		try {
			const res = await axios.post<IUser>('/auth/login')
			if (res) {
				return res
			} else {
				return null
			}
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
