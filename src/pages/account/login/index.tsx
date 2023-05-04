import { ModalAuth } from '@/src/components'
import { session } from '@/src/interfaces/user.interface'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'

const LoginPage: NextPage<{ session: session }> = session => {
	return <ModalAuth session={session} />
}

export const getServerSideProps: GetServerSideProps = async context => {
	const session = await getSession(context)

	console.log('session: ', session)
	console.log('context: ', context)
	console.log('context.params: ', context.params)

	if (!session) {
		return {
			redirect: {
				destination: '/account/login'
			}
		}
	}
	return {
		props: { session },
		revalidate: 10
	}
}

export default LoginPage
