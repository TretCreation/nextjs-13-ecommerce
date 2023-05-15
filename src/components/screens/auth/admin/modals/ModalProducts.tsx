import { CrossIcon } from '@/public'
import { Input, Modal } from '@/src/components'
import { FC } from 'react'
import styles from './ModalProducts.module.scss'

interface IModalProductsProps {
	handleClose: () => void
	isOpen: boolean
}

const ModalProducts: FC<IModalProductsProps> = ({ handleClose, isOpen }) => {
	if (!isOpen) return null

	// const onChangeType = async() => {
	// 	const data = await
	// }

	return (
		<Modal wrapperId='react-portal-modal' handleClose={handleClose}>
			<CrossIcon />
			<div className={styles.add}>
				{/* Email input field */}
				<div>
					<p>Add name</p>
					<Input type='text' placeholder='Add name' />
				</div>
				{/* Price input field */}
				<div>
					<p>Add price</p>
					<Input type='number' min='1' step='any' placeholder='Add price' />
				</div>
				{/* Type input field */}
				<div>
					<label htmlFor='type'>Type</label>
					{/* <select name="type" onChange={} value={}> */}
					<option>1</option>
					<option>2</option>
					<option>3</option>
					{/* </select> */}
				</div>
			</div>
			<div className={styles.remove}></div>
			<div className={styles.edit}></div>
		</Modal>
	)
}

export default ModalProducts
