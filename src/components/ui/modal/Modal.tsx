import React, { FC, useEffect } from 'react'
import { useScrollBlock } from '../..'
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
	// Lock scroll on modal
	// useEffect(() => {
	// 	document.body.style.overflow = 'hidden'
	// 	return (): void => {
	// 		document.body.style.overflow = 'unset'
	// 	}
	// }, [isOpen])

	useScrollBlock()

	// Close modal on escape
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
			<div className={styles.content}>{children}</div>
		</ReactPortal>
	)
}

export default Modal
