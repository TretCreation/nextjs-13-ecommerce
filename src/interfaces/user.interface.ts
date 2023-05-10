export interface IUser {
	hasError: number
	errorMessage?: string
	body?: {
		name: string
		email: string
		password: string
	}
}
