import axios, { AxiosError } from 'axios'

import { IUser, IUserSession } from '../interfaces/user.interface'

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
      // ?
      // if (error instanceof AxiosError) {
      //   throw new Error(error.response?.data)
      // }
      console.log(error)
      throw error
    }
  },
  async findBy(email: string) {
    try {
      const res = await axios.get<IUserSession>(`/auth/user/find/?email=${email}`)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  async findByEmail(email: string) {
    try {
      const res = await axios.get<IUserSession>(`/auth/user?email=${email}`)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
