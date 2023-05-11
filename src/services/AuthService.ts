import axios, { AxiosError } from 'axios'
import { IUser } from '../interfaces/user.interface'

axios.defaults.baseURL = process.env.API_URL

export const AuthService = {
	async createUser(
		name: string,
		password: string,
		email?: string | null,
		google?: string | null,
		facebook?: string | null
	) {
		try {
			const res = await axios.post<IUser>('/auth/user', {
				name: name,
				email: email,
				google: google,
				facebook: facebook,
				password: password
			})
			return res.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response?.data
			}
		}
	},

	async findByEmail(type: string, email: string) {
		try {
			const res = await axios.get<string>(`/auth/user?${type}=${email}`)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
