export interface IUser {
	hasError: number
	errorMessage?: string
	body?: {
		name: string
		email: string | null
		google: string | null
		facebook: string | null
		password: string
	}
}

export interface IUserSession {
	id: number
	name: string
	email: string | null
	emailGoogle: string | null
	emailFacebook: string | null
	img: string
	image: string
	role: string
}
