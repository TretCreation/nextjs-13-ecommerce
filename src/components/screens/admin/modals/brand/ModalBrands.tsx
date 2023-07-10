import { CrossIcon } from '@/public'
import { Button, Input, Modal } from '@/src/components'
import { AdminService } from '@/src/services/AdminService'
import { FC, useEffect, useState } from 'react'
import styles from './ModalBrands.module.scss'

interface IModalBrandsProps {
	handleClose: () => void
	isOpen: boolean
}

const ModalBrands: FC<IModalBrandsProps> = ({ handleClose, isOpen }) => {
	const [addBrand, setAddBrand] = useState<string>('')
	const [removeBrand, setRemoveBrand] = useState<string>('')
	const [error, setError] = useState<string>('')

	const onAddSubmit = async () => {
		const checkBrand = await AdminService.checkBrand(addBrand)

		if (checkBrand.length === 0) {
			await AdminService.addBrand(addBrand)
			setError('success added')
			return
		}
		setError('brand exists')
	}
	const onRemoveSubmit = async () => {
		const checkBrand = await AdminService.checkBrand(removeBrand)

		if (checkBrand.length !== 0) {
			await AdminService.removeBrand(removeBrand)
			setError('success removed')
			return
		}
		setError('brand does not exist')
	}

	useEffect(() => {
		setError('')
	}, [handleClose])

	if (!isOpen) return null

	return (
		<Modal wrapperId='react-portal-modal' handleClose={handleClose}>
			<CrossIcon onClick={handleClose} className={styles.svg} />

			<div className={styles.add}>
				<p>New brand</p>
				<Input
					type='text'
					appearance='solid'
					placeholder='New brand'
					onChange={e => setAddBrand(e.target.value)}
					className='mb-10'
				/>
				{error === 'brand exists' && (
					<p className={styles.error}>This brand already exists</p>
				)}
				{error === 'success added' && <p className={styles.submit}>Success!</p>}
				<Button appearance='primary' onClick={onAddSubmit}>
					Save
				</Button>
			</div>

			<div className={styles.remove}>
				<p>Remove brand</p>
				<Input
					type='text'
					appearance='solid'
					placeholder='Remove a brand'
					onChange={e => setRemoveBrand(e.target.value)}
					className='mb-10'
				/>
				{error === 'brand does not exist' && (
					<p className={styles.error}>This brand does not exist</p>
				)}
				{error === 'success removed' && <p className={styles.submit}>Success!</p>}

				<Button appearance='primary' onClick={onRemoveSubmit}>
					Save
				</Button>
			</div>
		</Modal>
	)
}

export default ModalBrands
