import { CrossIcon } from '@/public'
import { Button, Modal } from '@/src/components'
import { createRef, FC, useEffect, useRef } from 'react'
import styles from './ModalAuth.module.scss'

interface IModalAuthProps {
	handleClose: () => void
	isOpen: boolean
}

const ModalAuth: FC<IModalAuthProps> = ({ handleClose, isOpen }) => {
	const ref = useRef()

	useEffect(() => {
		console.log('UseEffect ref.current ', ref.current)
	})

	console.log('ref [ModalAuth]: ', ref)
	console.log('ref [ModalAuth].current: ', ref.current)
	if (!isOpen) return null

	return (
		<Modal
			wrapperId='react-portal-modal'
			handleClose={handleClose}
			ref={ref}
		>
			<div className={styles.content}>
				<Button appearance='svg'>
					<CrossIcon onClick={handleClose} className='h-5 w-5' />
				</Button>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Maiores perspiciatis labore tempore explicabo autem
					reprehenderit libero voluptas rem? Voluptatibus incidunt
					necessitatibus qui facere deleniti quam soluta corrupti
					magni! Voluptates, modi.
				</p>
			</div>
		</Modal>
	)
}

export default ModalAuth
