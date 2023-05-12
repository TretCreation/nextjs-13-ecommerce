import { AuthService } from '@/src/services/AuthService'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

const {
	GOOGLE_CLIENT_ID = '',
	GOOGLE_CLIENT_SECRET = '',
	NEXTAUTH_SECRET = '',
	FACEBOOK_CLIENT_ID = '',
	FACEBOOK_CLIENT_SECRET = ''
} = process.env

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'yourmail@mail.com'
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: '*******'
				}
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
		}),
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		}),
		FacebookProvider({
			clientId: FACEBOOK_CLIENT_ID,
			clientSecret: FACEBOOK_CLIENT_SECRET
		})
	],
	callbacks: {
		async signIn({ profile, account }) {
			if (account?.provider === 'google') {
				try {
					const userEmailGoogle = await AuthService.findByEmail(
						'google',
						profile?.email ?? ''
					)
					if (!userEmailGoogle) {
						const res = await AuthService.createUser(
							profile?.name ?? '',
							'Signed using OAuth',
							null,
							profile?.email ?? '',
							null
						)
						res
					}
					return true
				} catch (error) {
					console.log(error)
					throw error
				}
			}
			if (account?.provider === 'facebook') {
				try {
					const userEmailFacebook = await AuthService.findByEmail(
						'facebook',
						profile?.email ?? ''
					)
					if (!userEmailFacebook) {
						const res = await AuthService.createUser(
							profile?.name ?? '',
							'Signed using OAuth',
							null,
							null,
							profile?.email ?? ''
						)
						res
					}
					return true
				} catch (error) {
					console.log(error)
					throw error
				}
			}
			return true
		}
	},
	pages: {
		signIn: '/auth/sign-in',
		error: '/auth/error'
	},
	secret: NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
