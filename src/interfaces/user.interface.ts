export interface IUser {
  hasError: number
  errorMessage?: string
  body?: {
    name: string
    email: string | null
    password: string
  }
}

export interface IUserSession {
  id: number
  name: string
  email: string | null
  img: string
  image: string
  role: string
}
