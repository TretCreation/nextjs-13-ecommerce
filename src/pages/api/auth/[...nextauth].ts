import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
//?
const { GOOGLE_ID = '', GOOGLE_SECRET = '', JWT_SECRET = '' } = process.env

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: GOOGLE_ID,
			clientSecret: GOOGLE_SECRET
		})
		// ...add more providers here
	],
	secret: JWT_SECRET
}
export default NextAuth(authOptions)
