import axios, { AxiosError } from 'axios'
import { IUser } from '../interfaces/user.interface'

axios.defaults.baseURL = process.env.API_URL

export const AuthService = {
	async createUser(name: string, email: string, password: string) {
		try {
			const res = await axios.post<IUser>('/auth/user', {
				name,
				email,
				password
			})
			return res.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response?.data
			}
		}
	}
}
