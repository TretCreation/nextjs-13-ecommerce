import { CrossIcon } from '@/public'
import { Button, Input, Modal } from '@/src/components'
import { AdminService } from '@/src/services/AdminService'
import { FC, useEffect, useState } from 'react'
import styles from './ModalTypes.module.scss'

interface IModalTypesProps {
	handleClose: () => void
	isOpen: boolean
}

const ModalTypes: FC<IModalTypesProps> = ({ handleClose, isOpen }) => {
	const [addType, setAddType] = useState<string>('')
	const [removeType, setRemoveType] = useState<string>('')
	const [error, setError] = useState<string>('')

	const onAddSubmit = async () => {
		const checkType = await AdminService.checkType(addType)

		if (checkType.length === 0) {
			await AdminService.addType(addType)
			setError('success added')
			return
		}
		setError('type exists')
	}
	const onRemoveSubmit = async () => {
		const checkType = await AdminService.checkType(removeType)

		if (checkType.length !== 0) {
			await AdminService.removeType(removeType)
			setError('success removed')
			return
		}
		setError('type does not exist')
	}

	useEffect(() => {
		setError('')
	}, [handleClose])

	if (!isOpen) return null

	return (
		<Modal wrapperId='react-portal-modal' handleClose={handleClose}>
			<CrossIcon onClick={handleClose} className='h-5 w-5' />
			<div className={styles.add}>
				<Input
					type='text'
					appearance='solid'
					placeholder='New Type'
					onChange={e => setAddType(e.target.value)}
					className='mb-10'
				/>
				{error === 'type exists' && (
					<p className={styles.error}>This type already exists</p>
				)}
				{error === 'success added' && <p className={styles.submit}>Success!</p>}
				<Button appearance='primary' onClick={onAddSubmit}>
					Add a Type
				</Button>
			</div>
			<div>vertical line</div>
			<div className={styles.remove}>
				<Input
					type='text'
					appearance='solid'
					placeholder='Remove a Type'
					onChange={e => setRemoveType(e.target.value)}
					className='mb-10'
				/>
				{error === 'type does not exist' && (
					<p className={styles.error}>This type does not exist</p>
				)}
				{error === 'success removed' && <p className={styles.submit}>Success!</p>}
				<Button appearance='primary' onClick={onRemoveSubmit}>
					Remove a Type
				</Button>
			</div>
		</Modal>
	)
}

export default ModalTypes
