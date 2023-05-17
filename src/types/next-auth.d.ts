import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: {
			id: number
			name: string
			email: string | null
			emailGoogle: string | null
			emailFacebook: string | null
			img: string
			image: string
			role: string
			accessToken: string
		}
	}
	// interface User {
	// 	id: number
	// 	name: string
	// 	email: string | null
	// 	emailGoogle: string | null
	// 	emailFacebook: string | null
	// 	img: string
	// 	role: string
	// 	accessToken: string
	// }

	// interface Session {
	// 	user: User
	// }
}

// declare module 'next-auth/jwt' {
// 	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
// 	interface JWT {
// 		/** OpenID ID Token */
// 		idToken?: string
// 	}
// }
