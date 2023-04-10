import { LaptopIcon, SmartphoneIcon } from '@/public'
import { useOnClickOutside } from '@/src/components'
import { createRef, FC, useEffect } from 'react'
import DropdownItem from '../dropdown-item/DropdownItem'
import styles from './DropdownList.module.scss'

interface IDropdownListProps {
	isOpen: boolean
	handleClose: () => void
}

const DropdownList: FC<IDropdownListProps> = ({ isOpen, handleClose }) => {
	if (!isOpen) return null

	const ref = createRef<HTMLDivElement>()

	//* Close modal on click outside
	useOnClickOutside(ref, () => handleClose())

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
		<div className={styles.list} ref={ref}>
			<DropdownItem
				svg={<SmartphoneIcon className={styles.svg} />}
				text='Smartphones'
				href='#'
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