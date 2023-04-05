import { LaptopIcon, SmartphoneIcon } from '@/public'
import { FC } from 'react'
import DropdownItem from '../dropdown-item/DropdownItem'
import styles from './DropdownList.module.scss'

interface IDropdownListProps {
	isOpen: boolean
	handleClose: () => void
}

const DropdownList: FC<IDropdownListProps> = ({ isOpen }) => {
	if (!isOpen) return null

	return (
		<ul className={styles.list}>
			<DropdownItem
				svg={<SmartphoneIcon className={styles.svg} />}
				text='Smartphones'
			/>
			<DropdownItem
				svg={<LaptopIcon className={styles.svg} />}
				text='Laptops'
			/>
			<DropdownItem text='text #3' />
		</ul>
	)
}

export default DropdownList
