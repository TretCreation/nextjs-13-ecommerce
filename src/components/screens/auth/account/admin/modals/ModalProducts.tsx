import { CrossIcon } from '@/public'
import { Modal } from '@/src/components'
import { FC } from 'react'
import styles from './ModalProducts.module.scss'

interface IModalProductsProps {
	handleClose: () => void
	isOpen: boolean
}

const ModalProducts: FC<IModalProductsProps> = ({ handleClose, isOpen }) => {
	if (!isOpen) return null

	return (
		<Modal wrapperId='react-portal-modal' handleClose={handleClose}>
			<CrossIcon />
			<div className={styles.add}></div>
			<div className={styles.remove}></div>
		</Modal>
	)
}

export default ModalProducts
