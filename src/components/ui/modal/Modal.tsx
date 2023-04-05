import React, { FC, useEffect } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import useScrollBlock from '../../hooks/useScrollBlock'
import styles from './Modal.module.scss'
import ReactPortal from './ReactPortal'

interface ModalProps {
	children: React.ReactNode
	wrapperId: string
	handleClose: () => void
	ref?: any
}

const Modal: FC<ModalProps> = ({ children, wrapperId, handleClose, ref }) => {
	//* Close modal on click outside
	useOnClickOutside(ref, () => handleClose())
	console.log('ref [Modal]: ', ref)
	console.log('ref.current [Modal]: ', ref.current)

	useEffect(() => {
		console.log('useEffect: ref ', ref)
		console.log('useEffect: ref.current ', ref.current)
	}, [])

	//* Lock scroll on modal
	useScrollBlock()
	// &&
	// useEffect(() => {
	// 	document.body.style.overflow = 'hidden'
	// 	return (): void => {
	// 		document.body.style.overflow = 'unset'
	// 	}
	// }, [isOpen])

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
			<div className={styles.deleted}>
				<div className={styles.content}>{children}</div>
			</div>
		</ReactPortal>
	)
}

export default Modal
