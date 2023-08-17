import axios, { AxiosError } from 'axios'

import { IUser, IUserSession } from '../interfaces/user.interface'

axios.defaults.baseURL = process.env.API_URL

export const AuthService = {
  async createUser(
    name: string,
    password: string,
    email?: string | null,
    emailGoogle?: string | null,
    emailFacebook?: string | null
  ) {
    try {
      const res = await axios.post<IUser>('/auth/user', {
        name,
        email: email || null,
        emailGoogle: emailGoogle || null,
        emailFacebook: emailFacebook || null,
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
  async findByEmail(type: string, email: string) {
    try {
      const res = await axios.get<IUserSession>(`/auth/user?${type}=${email}`)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
