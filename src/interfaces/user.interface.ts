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
