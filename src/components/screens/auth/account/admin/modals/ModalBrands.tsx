import { CrossIcon } from '@/public'
import { Modal } from '@/src/components'
import { FC } from 'react'
import styles from './ModalBrands.module.scss'

interface IModalBrandsProps {
	handleClose: () => void
	isOpen: boolean
}

const ModalBrands: FC<IModalBrandsProps> = ({ handleClose, isOpen }) => {
	if (!isOpen) return null

	return (
		<Modal wrapperId='react-portal-modal' handleClose={handleClose}>
			<CrossIcon />
			<div className={styles.add}></div>
			<div className={styles.remove}></div>
		</Modal>
	)
}

export default ModalBrands
