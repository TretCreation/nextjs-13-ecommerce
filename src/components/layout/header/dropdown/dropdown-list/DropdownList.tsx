import { LaptopIcon, SmartphoneIcon } from '@/public'
import useOnClickOutside from '@/src/components/hooks/useOnClickOutside'
import { createRef, FC, useEffect } from 'react'
import DropdownItem from '../dropdown-item/DropdownItem'
import styles from './DropdownList.module.scss'

interface IDropdownListProps {
	isOpen: boolean
	handleClose: () => void
}

const DropdownList: FC<IDropdownListProps> = ({ isOpen, handleClose }) => {
	// const { ref, isShow, setIsShow } = useOutside(false)

	// function handleIsShow() {
	// 	setIsShow(!isShow)
	// }

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
