import { LaptopIcon, SmartphoneIcon } from '@/public'
import { useOutside, useEscape } from '@/src/components'
import { FC, useRef } from 'react'
import DropdownItem from '../dropdown-item/DropdownItem'
import styles from './DropdownList.module.scss'

interface IDropdownListProps {
	isOpen: boolean
	handleClose: () => void
}

const DropdownList: FC<IDropdownListProps> = ({ isOpen, handleClose }) => {
	const ref = useRef<HTMLDivElement>(null)

	//* Close modal on click outside
	useOutside(ref, () => handleClose(), isOpen)

	//* Close modal on escape
	useEscape(handleClose, isOpen)

	if (!isOpen) return null
	return (
		<div className={styles.list} ref={ref}>
			<DropdownItem
				svg={<SmartphoneIcon className={styles.svg} />}
				text='Smartphones'
				href='/category/smartphones'
			/>
			<DropdownItem
				svg={<LaptopIcon className={styles.svg} />}
				text='Laptops'
				href='#'
			/>
			<DropdownItem text='text #3' href='#' />
		</div>
	)
}

export default DropdownList
