import React, { createRef, FC, useEffect } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import useScrollBlock from '../../hooks/useScrollBlock'
import styles from './Modal.module.scss'
import ReactPortal from './ReactPortal'

interface ModalProps {
	children: React.ReactNode
	wrapperId: string
	handleClose: () => void
}

const Modal: FC<ModalProps> = ({ children, wrapperId, handleClose }) => {
	const ref = createRef<HTMLDivElement>()

	//* Close modal on click outside
	useOnClickOutside(ref, () => handleClose())

	//* Lock scroll on modal
	useScrollBlock()

	//* Close modal on escape
	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) =>
			e.key === 'Escape' ? handleClose() : null
		document.body.addEventListener('keydown', closeOnEscapeKey)
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey)
		}
	}, [handleClose])

	return (
		<ReactPortal wrapperId={wrapperId}>
			<div className={styles.modal}></div>
			<div className={styles.deleted} ref={ref}>
				<div className={styles.content}>{children}</div>
			</div>
		</ReactPortal>
	)
}

export default Modal
