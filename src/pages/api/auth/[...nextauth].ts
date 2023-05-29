import { AuthService } from '@/src/services/AuthService'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

const {
	GOOGLE_CLIENT_ID = '',
	GOOGLE_CLIENT_SECRET = '',
	FACEBOOK_CLIENT_ID = '',
	FACEBOOK_CLIENT_SECRET = ''
} = process.env

const hashPassword = async () => {
	return Math.random().toString(36).slice(-8)
}

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
	jwt: {
		secret: process.env.NEXTAUTH_SECRET
	},
	session: {
		maxAge: 8 * 60 * 60
	},
	pages: {
		signIn: '/auth/sign-in',
		error: '/auth/error'
	},
	callbacks: {
		async signIn({ profile, account }) {
			if (account?.provider === 'google') {
				try {
					const userEmailGoogle = await AuthService.findByEmail(
						'google',
						profile?.email ?? ''
					)
					if (!userEmailGoogle) {
						await AuthService.createUser(
							profile?.name ?? '',
							await hashPassword(),
							null,
							profile?.email,
							null
						)
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
							await hashPassword(),
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
		},
		async jwt({ token, user }) {
			return { ...token, ...user }
		},
		async session({ session, token, user }) {
			session.user = token
			const userId = await AuthService.findBy(token.email as string)
			//* Update session token
			token.id = userId.id

			return session
		}
	}
}

export default NextAuth(authOptions)
