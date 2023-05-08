import { ModalAuth } from '@/src/components'
import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { FC } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'

interface IModalAuthProps {
	handleClose: () => void
	isOpen: boolean
}

const ModalAuthPage: FC<IModalAuthProps> = ({ handleClose, isOpen }) => {
	return <ModalAuth handleClose={handleClose} isOpen={isOpen} />
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const session = await getServerSession(context.req, context.res, authOptions)

	if (!session || null) {
		return {
			redirect: {
				destination: '/'
				//?
				// destination:
			}
		}
	}
	return {
		props: { session },
		revalidate: 10
	}
}

export default ModalAuthPage
