import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
//?
const {
	GOOGLE_CLIENT_ID = '',
	GOOGLE_CLIENT_SECRET = '',
	NEXTAUTH_SECRET = ''
} = process.env

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		})
		// ...add more providers here
	],
	secret: NEXTAUTH_SECRET
}
export default NextAuth(authOptions)
