import { CrossIcon } from '@/public'
import { Button, Login, Modal } from '@/src/components'
import { session } from '@/src/interfaces/user.interface'
import { signIn } from 'next-auth/react'
import { FC } from 'react'
import styles from './ModalAuth.module.scss'

interface IModalAuthProps {
	handleClose: () => void
	isOpen: boolean
	session: session
}

const ModalAuth: FC<IModalAuthProps> = ({ handleClose, isOpen, session }) => {
	// const { data: session } = useSession()

	if (!isOpen) return null

	if (session) {
		return <Login session={session} />
	} else {
		return (
			<Modal wrapperId='react-portal-modal' handleClose={handleClose}>
				<div className={styles.content}>
					<Button appearance='svg'>
						<CrossIcon onClick={handleClose} className='h-5 w-5' />
					</Button>
					<div className={styles.menu}>
						<button onClick={() => signIn()}>signIn</button>
					</div>
				</div>
			</Modal>
		)
	}
}

export default ModalAuth
