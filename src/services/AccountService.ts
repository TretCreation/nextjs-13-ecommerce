import axios from 'axios'

import { IUserSession } from '../interfaces/user.interface'

axios.defaults.baseURL = process.env.API_URL

export const AccountService = {
	async getInfo(userId: number | undefined) {
		try {
			const res = await axios.get<IUserSession>(`/account/info?userId=` + userId)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
