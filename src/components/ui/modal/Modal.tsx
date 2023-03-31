import { FC, useEffect } from 'react'
// import useScrollBlock from '../../hooks/useScrollBlock'
import styles from './Modal.module.scss'
import ReactPortal from './ReactPortal'

interface ModalProps {
	children: React.ReactNode
	wrapperId: string
	isOpen: boolean
	handleClose: () => void
}

const Modal: FC<ModalProps> = ({
	children,
	wrapperId,
	isOpen,
	handleClose
}) => {
	// const [isScrollLocked] = useScrollBlock()

	// Close modal on escape
	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) =>
			e.key === 'Escape' ? handleClose() : null
		document.body.addEventListener('keydown', closeOnEscapeKey)
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey)
		}
	}, [handleClose])

	// if(!isScrollLocked) return null

	return (
		<ReactPortal wrapperId={wrapperId}>
			<div className={styles.modal}></div>
			<button onClick={handleClose} className='z-50'>
				GOD SWAGG
			</button>
			<div className={styles.content}>{children}</div>
		</ReactPortal>
	)
}

export default Modal
