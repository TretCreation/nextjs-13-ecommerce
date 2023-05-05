import { CrossIcon } from '@/public'
import { Button, Input, Modal } from '@/src/components'
import AccountPage from '@/src/pages/auth/account'
import { signIn, useSession } from 'next-auth/react'
import { FC } from 'react'
import styles from './ModalAuth.module.scss'

interface IModalAuthProps {
	handleClose: () => void
	isOpen: boolean
}

const ModalAuth: FC<IModalAuthProps> = ({ handleClose, isOpen }) => {
	const { data: session } = useSession()

	if (!isOpen) return null

	if (session) {
		return <AccountPage />
	} else {
		return (
			<Modal wrapperId='react-portal-modal' handleClose={handleClose}>
				<div className={styles.content}>
					<Button appearance='svg'>
						<CrossIcon onClick={handleClose} className='h-5 w-5' />
					</Button>
					<div className={styles.menu}>
						<div className={styles.h1}>
							<h1> CREATE AN ACCOUNT</h1>
							<p>Register for new costumer</p>
						</div>
						<div className={styles.input}>
							<p>Full Name</p>
							<Input
								appearance='solid'
								placeholder='Your name'
								type='search'
								className='mb-1'
							/>
							<p>Email address</p>
							<Input
								appearance='solid'
								placeholder='Your name'
								type='search'
								className='mb-1'
							/>
							<p>Password</p>
							<Input
								appearance='solid'
								placeholder='Your name'
								type='search'
								className='mb-1'
							/>
							<p>Confirm Password</p>
							<Input
								appearance='solid'
								placeholder='Your name'
								type='search'
								className='mb-3'
							/>
							<div className='mb-1 flex flex-row'>
								<Input type='checkbox' className='mr-1' />
								<p>I have read and agree to the terms & conditions</p>
							</div>
							<Button appearance='primary' className='mb-4'>
								CREATE ACCOUNT
							</Button>
							<p className='mb-2'>OR SIGN UP WITH</p>
							<div className='flex flex-row'>
								<Button
									appearance='primary'
									className='mr-2 mb-3 bg-blue-500'
								>
									FACEBOOK
								</Button>
								<Button appearance='primary' onClick={() => signIn()}>
									GOOGLE
								</Button>
							</div>
							<div className='flex flex-row'>
								<p>Already have account?</p>
								<Button appearance='solid' className='text-primary-main'>
									Login now
								</Button>
							</div>
						</div>
						<button onClick={() => signIn()}>signIn</button>
					</div>
				</div>
			</Modal>
		)
	}
}

export default ModalAuth
