import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
//?
const {
	GOOGLE_CLIENT_ID = '',
	GOOGLE_CLIENT_SECRET = '',
	NEXTAUTH_SECRET = '',
	FACEBOOK_CLIENT_ID = '',
	FACEBOOK_CLIENT_SECRET = ''
} = process.env

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		}),
		FacebookProvider({
			clientId: FACEBOOK_CLIENT_ID,
			clientSecret: FACEBOOK_CLIENT_SECRET
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'email',
					type: 'email',
					placeholder: 'jsmith@example.com'
				},
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials, req) {
				const res = await fetch('http://localhost:3000/api/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password
					})
				})

				const user = await res.json()

				if (user) {
					return user
				} else {
					return null
				}
			}
		})
	],
	secret: NEXTAUTH_SECRET
}
export default NextAuth(authOptions)
