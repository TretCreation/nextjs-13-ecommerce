//?
import { Session } from 'next-auth'

export interface IUserProps {
	user: {
		firstName: string
		lastName: string
	}
}

export type session = Session | null
